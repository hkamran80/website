import Breadcrumbs from "@/components/Breadcrumbs";
import Head from "next/head";
import Layout from "@/components/Layout";
import { getBaseUrl } from "@/lib/urls";
import { useEffect, useState } from "react";
import { WebPageJsonLd } from "next-seo";
import type { NextPage } from "next";

const TestflightCleanerProgram: NextPage = () => {
    const [csvFile, setCsvFile] = useState<File>();
    const [useHeaders, setUseHeaders] = useState<boolean>(false);
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [cleanedCsv, setCleanedCsv] = useState<string[][]>([]);

    useEffect(() => {
        checkForErrors();
        cleanCsv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [csvData]);

    const processCsv = (csv: string, delimiter = ",") =>
        setCsvData(csv.split("\n").map((row) => row.split(delimiter)));

    const checkForErrors = () => {
        if (!csvData.every((row) => row.length === 3)) {
            const over = csvData.every((row) => row.length > 3);
            setErrors([
                ...errors,
                `${
                    over ? "Too many columns" : "Not enough columns"
                }. TestFlight CSVs should have three columns: first name, last name, and email.`,
            ]);
        }

        if (
            !csvData
                .map((row) => row[2].replace(/(\r\n|\n|\r)/gm, "").trim())
                .every(
                    (email) =>
                        email.match(
                            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g,
                        )?.length !== 0,
                )
        ) {
            setErrors([...errors, "Some emails are malformed."]);
        }
    };

    const removeUnnecessaryStrings = (str: string): string =>
        str.replace(/[^A-Za-z0-9.]/g, "").trim();

    const cleanCsv = () => {
        if (csvData && errors.length === 0) {
            const rows = useHeaders ? csvData.slice(1) : csvData;
            const cleanedRows = rows.map((row) => [
                removeUnnecessaryStrings(row[0]),
                removeUnnecessaryStrings(row[1]),
                row[2].replace(/(\r\n|\n|\r)/gm, "").trim(),
            ]);

            setCleanedCsv(
                useHeaders
                    ? [csvData[0].map(removeUnnecessaryStrings), ...cleanedRows]
                    : cleanedRows,
            );
        }
    };

    const upload = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = (e) => {
            const text = e.target?.result;
            if (text) {
                processCsv(text.toString());
            }
        };

        if (file) {
            reader.readAsText(file);
        }
    };

    const exportCsv = () => {
        if (cleanedCsv) {
            const blob = new Blob(
                [cleanedCsv.map((row) => row.join(",")).join("\n")],
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
                            <div className="space-y-4 md:col-span-2">
                                <form className="grid grid-cols-1 gap-4 pb-4 md:grid-cols-6">
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
                                            id="checked-checkbox"
                                            type="checkbox"
                                            value=""
                                            className="h-4 w-4 rounded-lg border-hk-grey-hover bg-hk-grey text-pink-700 focus:ring-2 focus:ring-pink-700"
                                            onChange={(e) =>
                                                setUseHeaders(e.target.checked)
                                            }
                                        />
                                        <label
                                            htmlFor="checked-checkbox"
                                            className="ml-2 text-sm font-medium text-gray-400"
                                        >
                                            Use first row as headers
                                        </label>
                                    </div>
                                </form>

                                {errors.length > 0 && (
                                    <section id="errors">
                                        <strong>Errors</strong>

                                        <ul className="list-inside list-disc text-red-500">
                                            {errors.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                {cleanedCsv.length > 0 && (
                                    <>
                                        <section
                                            id="preview"
                                            className="prose prose-invert max-w-none max-md:hidden"
                                        >
                                            <table>
                                                {useHeaders && (
                                                    <thead>
                                                        <tr>
                                                            {cleanedCsv[0].map(
                                                                (
                                                                    header,
                                                                    index,
                                                                ) => (
                                                                    <th
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {header}
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
                                                    ).map((row, index) => (
                                                        <tr key={index}>
                                                            {row.map(
                                                                (
                                                                    value,
                                                                    index,
                                                                ) => (
                                                                    <td
                                                                        key={
                                                                            index
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

                                        <button
                                            type="button"
                                            className="w-full rounded-lg bg-hk-grey px-4 py-2 text-center text-sm text-white"
                                            onClick={() => exportCsv()}
                                        >
                                            Export
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
