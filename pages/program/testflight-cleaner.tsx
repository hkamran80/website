import Breadcrumbs from "@/components/Breadcrumbs";
import Head from "next/head";
import Layout from "@/components/Layout";
import { ChevronsDown } from "lucide-react";
import { classNames } from "@hkamran/utility-web";
import { getBaseUrl } from "@/lib/urls";
import { numberWithCommas } from "@hkamran/utility-strings";
import { useEffect, useState } from "react";
import { WebPageJsonLd } from "next-seo";
import type { NextPage } from "next";

type CsvRow = string[] | { row: string[]; flag: "malformed" | "duplicate" };
type ParsingError = { error: string; preventBypass?: boolean };

const TestflightCleanerProgram: NextPage = () => {
    const [csvFile, setCsvFile] = useState<File>();
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [errors, setErrors] = useState<ParsingError[]>([]);
    const [errorChecked, setErrorChecked] = useState<boolean>(false);
    const [cleanedCsv, setCleanedCsv] = useState<CsvRow[]>([]);
    const [duplicatedEmails, setDuplicatedEmails] = useState<string[]>([]);

    const [useHeaders, setUseHeaders] = useState<boolean>(false);
    const [leaveMalformedRows, setLeaveMalformedRows] =
        useState<boolean>(false);

    useEffect(() => {
        checkForErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [csvData]);

    useEffect(() => {
        if (
            errorChecked &&
            csvData.length > 0 &&
            (errors.length === 0 ||
                (errors.length > 0 &&
                    errors.filter((error) => error.preventBypass === true)
                        .length === 0))
        ) {
            cleanCsv();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorChecked, useHeaders, leaveMalformedRows]);

    const processCsv = (csv: string, delimiter = ",") =>
        setCsvData(csv.split("\n").map((row) => row.split(delimiter)));

    const checkForErrors = () => {
        setErrors([]);

        if (!csvData.every((row) => row.length === 3)) {
            const over = csvData.every((row) => row.length > 3);
            setErrors([
                ...errors,
                {
                    error: `${
                        over ? "Too many columns" : "Not enough columns"
                    }. TestFlight CSVs should have three columns: first name, last name, and email.`,
                    preventBypass: true,
                },
            ]);
        }

        if (
            !csvData
                .map((row) =>
                    row[2]
                        .replace(/(\r\n|\n|\r)/gm, "")
                        .trim()
                        .toLowerCase(),
                )
                .every(
                    (email) =>
                        email.match(
                            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g,
                        )?.length ?? 0 > 0,
                ) ||
            !csvData
                .map((row) =>
                    row[2]
                        .replace(/(\r\n|\n|\r)/gm, "")
                        .trim()
                        .toLowerCase(),
                )
                .every((email) => email.includes("@"))
        ) {
            setErrors([
                ...errors,
                {
                    error: "Some emails are malformed",
                },
            ]);
        }

        setErrorChecked(true);
    };

    const removeUnnecessaryStrings = (str: string): string =>
        str.replace(/[^A-Za-z0-9.-\s\u00C0-\u1FFF\u2800-\uFFFD]/g, "").trim();

    const cleanCsv = () => {
        if (
            errorChecked &&
            csvData.length > 0 &&
            (errors.length === 0 ||
                (errors.length > 0 &&
                    errors.filter((error) => error.preventBypass === true)
                        .length === 0))
        ) {
            const rows = useHeaders ? csvData.slice(1) : csvData;

            const filteredRows = leaveMalformedRows
                ? rows
                : rows.filter((row) => (row as string[])[2].includes("@"));

            const cleanedRows = filteredRows.reduce(
                (previous: CsvRow[], row: string[]): CsvRow[] => {
                    const cleanedRow = [
                        removeUnnecessaryStrings(row[0]),
                        removeUnnecessaryStrings(row[1]),
                        row[2]
                            .replace(/(\r\n|\n|\r)/gm, "")
                            .trim()
                            .toLowerCase(),
                    ];

                    if (
                        previous.some(
                            (previousRow) =>
                                (Array.isArray(previousRow)
                                    ? previousRow
                                    : previousRow.row)[2]
                                    .replace(/(\r\n|\n|\r)/gm, "")
                                    .trim()
                                    .toLowerCase() === cleanedRow[2],
                        )
                    ) {
                        return !leaveMalformedRows
                            ? previous
                            : [
                                  ...previous,
                                  {
                                      row: cleanedRow,
                                      flag: "duplicate",
                                  },
                              ];
                    }

                    if (leaveMalformedRows && !row[2].includes("@")) {
                        return [
                            ...previous,
                            {
                                row: cleanedRow,
                                flag: "malformed",
                            } as CsvRow,
                        ];
                    }

                    return [...previous, cleanedRow];
                },
                [] as CsvRow[],
            );

            setCleanedCsv(
                useHeaders
                    ? [csvData[0].map(removeUnnecessaryStrings), ...cleanedRows]
                    : cleanedRows,
            );

            setDuplicatedEmails(
                cleanedRows.reduce((previous: string[], row) => {
                    if (!Array.isArray(row) && row.flag === "duplicate") {
                        return [...previous, row.row[2]];
                    }

                    return previous;
                }, []),
            );
        }
    };

    const upload = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = (e) => {
            setErrorChecked(false);
            setErrors([]);
            setCsvData([]);
            setDuplicatedEmails([]);

            const text = e.target?.result;
            if (text) {
                processCsv(text.toString());
            }
        };

        if (file) {
            reader.readAsText(file);
        }
    };

    const clear = () => {
        setCsvFile(undefined);
        setErrorChecked(false);
        setErrors([]);
        setCsvData([]);
        setCleanedCsv([]);
        setDuplicatedEmails([]);
        (document.getElementById("file-input") as HTMLInputElement).value = "";

        setUseHeaders(false);
        setLeaveMalformedRows(false);
    };

    const exportCsv = () => {
        if (cleanedCsv) {
            const blob = new Blob(
                [
                    cleanedCsv
                        .filter(Array.isArray)
                        .map((row) => row.join(","))
                        .join("\n"),
                ],
                { type: "text/csv" },
            );

            const element = document.createElement("a");
            element.href = URL.createObjectURL(blob);
            element.download = "TestFlight Testers - Cleaned.csv";
            document.body.appendChild(element);
            element.click();
            URL.revokeObjectURL(element.href);
            document.body.removeChild(element);
        }
    };

    return (
        <>
            <Head>
                <title>TestFlight Cleaner | H. Kamran</title>
            </Head>

            <WebPageJsonLd
                id={`${getBaseUrl()}/program/testflight-cleaner`}
                description="Clean your TestFlight tester CSVs and avoid dealing with those pesky errors!"
            />

            <Layout>
                <div className="mx-auto max-w-2xl">
                    <Breadcrumbs
                        basePath="/programs"
                        baseLabel="Programs"
                        currentLabel="TestFlight Cleaner"
                    />

                    <div className="space-y-2">
                        <h1 className="mx-auto text-center text-4xl font-semibold md:text-left">
                            TestFlight Cleaner
                        </h1>
                        <h2 className="text-center text-xl font-light leading-snug text-gray-300 sm:text-left sm:text-2xl">
                            Clean your TestFlight tester CSVs and avoid dealing
                            with those pesky errors!
                        </h2>
                    </div>

                    <div className="mt-6">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">
                            <div className="space-y-8 md:col-span-2">
                                <p className="text-sm text-gray-400">
                                    All data that you upload is stored locally
                                    in your browser. Nothing is ever transmitted
                                    to any server.
                                </p>

                                <form className="grid grid-cols-1 gap-4 md:grid-cols-6">
                                    <div className="md:col-span-5">
                                        <label
                                            htmlFor="file-input"
                                            className="sr-only"
                                        >
                                            Choose a CSV
                                        </label>
                                        <input
                                            type="file"
                                            accept=".csv"
                                            name="file-input"
                                            id="file-input"
                                            className=" block w-full rounded-lg border-0 bg-hk-grey text-sm text-gray-400 shadow-sm file:mr-4 file:border-0 file:bg-transparent file:bg-[#1e1e1e] file:py-3 file:px-4 file:text-white focus:z-10 focus:border-pink-700 focus:ring-pink-800"
                                            onChange={(e) => {
                                                if (
                                                    e.target.files?.length ??
                                                    0 > 0
                                                ) {
                                                    setCsvFile(
                                                        e.target.files![0],
                                                    );
                                                }
                                            }}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="rounded-lg bg-hk-grey text-sm transition duration-300 disabled:opacity-50 max-md:py-2"
                                        disabled={!csvFile}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (csvFile) {
                                                upload();
                                            }
                                        }}
                                    >
                                        Upload
                                    </button>

                                    <div className="flex items-center md:col-span-2">
                                        <input
                                            checked={useHeaders}
                                            id="use-headers"
                                            type="checkbox"
                                            value=""
                                            className="h-4 w-4 rounded-lg border-hk-grey-hover bg-hk-grey text-pink-700 focus:ring-2 focus:ring-pink-700"
                                            onChange={(e) =>
                                                setUseHeaders(e.target.checked)
                                            }
                                        />
                                        <label
                                            htmlFor="use-headers"
                                            className="ml-2 text-sm font-medium text-gray-400"
                                        >
                                            Use first row as headers
                                        </label>
                                    </div>

                                    <div className="flex items-center md:col-span-4">
                                        <input
                                            checked={leaveMalformedRows}
                                            id="leave-malformed-rows"
                                            type="checkbox"
                                            value=""
                                            className="h-4 w-4 rounded-lg border-hk-grey-hover bg-hk-grey text-pink-700 focus:ring-2 focus:ring-pink-700"
                                            onChange={(e) =>
                                                setLeaveMalformedRows(
                                                    e.target.checked,
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor="leave-malformed-rows"
                                            className="ml-2 text-sm font-medium text-gray-400"
                                        >
                                            Leave malformed/duplicated data in
                                            the table, but highlight it
                                        </label>
                                    </div>
                                </form>

                                {errors.length > 0 && (
                                    <section
                                        id="errors"
                                        className="prose prose-invert max-w-none"
                                    >
                                        <h2>Errors</h2>

                                        <ul className="">
                                            {errors.map((error, index) => (
                                                <li key={index}>
                                                    {error.error}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                {cleanedCsv.length > 0 && (
                                    <>
                                        <section
                                            id="testers"
                                            className="prose prose-invert max-w-none max-md:hidden"
                                        >
                                            <h2 className="flex">
                                                <span className="flex-1">
                                                    Testers (
                                                    {numberWithCommas(
                                                        cleanedCsv.length -
                                                            (useHeaders
                                                                ? 1
                                                                : 0),
                                                    )}
                                                    )
                                                </span>

                                                <button
                                                    type="button"
                                                    aria-label="Jump to bottom"
                                                    title="Jump to bottom"
                                                >
                                                    <ChevronsDown
                                                        size={24}
                                                        onClick={() =>
                                                            document
                                                                .getElementById(
                                                                    "export",
                                                                )
                                                                ?.scrollIntoView(
                                                                    {
                                                                        behavior:
                                                                            "smooth",
                                                                    },
                                                                )
                                                        }
                                                        className="stroke-gray-500 transition duration-300 hover:scale-125 hover:stroke-pink-700"
                                                    />
                                                </button>
                                            </h2>

                                            <table>
                                                {useHeaders &&
                                                    Array.isArray(
                                                        cleanedCsv[0],
                                                    ) && (
                                                        <thead>
                                                            <tr>
                                                                {(
                                                                    cleanedCsv[0] as string[]
                                                                ).map(
                                                                    (
                                                                        header,
                                                                        index,
                                                                    ) => (
                                                                        <th
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                header
                                                                            }
                                                                        </th>
                                                                    ),
                                                                )}
                                                            </tr>
                                                        </thead>
                                                    )}

                                                <tbody>
                                                    {(useHeaders
                                                        ? cleanedCsv.slice(1)
                                                        : cleanedCsv
                                                    ).map((row, rowIndex) => (
                                                        <tr key={rowIndex}>
                                                            {(Array.isArray(row)
                                                                ? row
                                                                : row.row
                                                            ).map(
                                                                (
                                                                    value,
                                                                    columnIndex,
                                                                ) => (
                                                                    <td
                                                                        key={
                                                                            columnIndex
                                                                        }
                                                                        className={
                                                                            ((useHeaders &&
                                                                                rowIndex !==
                                                                                    0) ||
                                                                                !useHeaders) &&
                                                                            columnIndex ===
                                                                                2
                                                                                ? classNames(
                                                                                      (!Array.isArray(
                                                                                          row,
                                                                                      ) &&
                                                                                          row.flag ===
                                                                                              "duplicate") ||
                                                                                          duplicatedEmails?.includes(
                                                                                              value,
                                                                                          )
                                                                                          ? "text-yellow-500"
                                                                                          : "",
                                                                                      !Array.isArray(
                                                                                          row,
                                                                                      ) &&
                                                                                          row.flag ===
                                                                                              "malformed"
                                                                                          ? "text-red-500"
                                                                                          : "",
                                                                                  )
                                                                                : undefined
                                                                        }
                                                                    >
                                                                        {value}
                                                                    </td>
                                                                ),
                                                            )}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </section>

                                        <div id="export" className="space-y-4">
                                            <button
                                                type="button"
                                                className="w-full rounded-lg bg-hk-grey px-4 py-2 text-center text-sm text-white"
                                                onClick={() => exportCsv()}
                                            >
                                                Export
                                            </button>

                                            <p className="prose prose-invert max-w-none text-sm">
                                                <strong>Note:</strong> The CSV
                                                export will only contain valid
                                                results. In the case of
                                                duplicated entries, only the
                                                first result will be exported.
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            className="w-full rounded-lg bg-hk-grey px-4 py-2 text-center text-sm text-white"
                                            onClick={() => clear()}
                                        >
                                            Clear
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default TestflightCleanerProgram;
