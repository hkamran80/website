import { numberWithCommas } from "@hkamran/utility-strings";
import { clsx as classNames } from "clsx";
import { ChevronsDown } from "lucide-react";
import { useEffect, useState } from "react";

type ErrorFlag = "malformed" | "duplicate"
type CsvRow = string[] | { row: string[]; flag: ErrorFlag };
type ParsingError = {
    error: ErrorFlag | "missing-columns" | "many-columns"
    message?: string;
    preventBypass?: boolean;
};

const TestFlightCleaner = () => {
    const [csvFile, setCsvFile] = useState<File>();
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [errors, setErrors] = useState<ParsingError[]>([]);
    const [errorChecked, setErrorChecked] = useState<boolean>(false);
    const [cleanedCsv, setCleanedCsv] = useState<CsvRow[]>([]);
    const [duplicatedEmails, setDuplicatedEmails] = useState<string[]>([]);
    const [duplicateFlag, setDuplicateFlag] = useState<boolean>(false);

    const [useHeaders, setUseHeaders] = useState<boolean>(false);
    const [leaveMalformedRows, setLeaveMalformedRows] = useState<boolean>(true);

    const processCsv = (csv: string, delimiter = ",") =>
        setCsvData(csv.split("\n").map((row) => row.split(delimiter)));

    const checkEmailValidity = (email: string): boolean =>
        email.includes("@") &&
        email.match(
            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g,
        ) !== null;

    const checkForErrors = () => {
        setErrors([]);

        if (!csvData.every((row) => row.length === 3)) {
            const over = csvData.every((row) => row.length > 3);
            setErrors([
                ...errors,
                {
                    error: over ? "many-columns" : "missing-columns",
                    message:
                        "TestFlight CSVs should have three columns: first name, last name, and email.",
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
                .every((email) => !checkEmailValidity(email))
        ) {
            setErrors([
                ...errors,
                {
                    error: "malformed",
                },
            ]);
        }

        setErrorChecked(true);
    };

    const removeUnnecessaryStrings = (str: string): string =>
        str
            .replace(/[^A-Za-z0-9.-\s\u00C0-\u1FFF\u2800-\uFFFD]/g, "")
            .replace(
                /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
                "",
            )
            .replace(
                /[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2580-\u27BF]|\uD83E[\uDD10-\uDDFF]|/g,
                "",
            )
            .trim();

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
                        if (!duplicateFlag) {
                            setErrors([
                                ...errors,
                                {
                                    error: "duplicate",
                                },
                            ]);
                            setDuplicateFlag(true);
                        }

                        return [
                            ...previous,
                            {
                                row: cleanedRow,
                                flag: "duplicate",
                            },
                        ];
                    }

                    if (!checkEmailValidity(cleanedRow[2])) {
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

        if (csvFile) {
            reader.readAsText(csvFile);
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

    useEffect(() => {
        checkForErrors();
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
    }, [errorChecked, useHeaders, leaveMalformedRows]);

    return (
        <>
            <div className="grid grid-cols-1 gap-x-4 gap-y-1 text-neutral-600 md:grid-cols-2 dark:text-neutral-400">
                <div className="space-y-8 md:col-span-2">
                    <section className="not-prose grid grid-cols-1 gap-4 md:grid-cols-6">
                        <div className="md:col-span-5">
                            <label htmlFor="file-input" className="sr-only">
                                Choose a CSV
                            </label>
                            <input
                                type="file"
                                accept=".csv"
                                name="file-input"
                                id="file-input"
                                className="block w-full rounded-lg border-0 bg-neutral-400 shadow-sm file:mr-4 file:border-0 file:bg-neutral-400 file:bg-transparent file:px-2 file:py-1 file:text-sm file:text-neutral-700 focus:z-10 focus:border-pink-700 focus:ring-pink-800 dark:bg-neutral-600 file:dark:bg-neutral-600 dark:file:text-neutral-300"
                                onChange={(e) => {
                                    if (e.target.files?.length ?? 0 > 0) {
                                        setCsvFile(e.target.files![0]);
                                    }
                                }}
                            />
                        </div>

                        <button
                            type="button"
                            className="rounded-lg bg-neutral-100 text-sm text-neutral-700 transition duration-300 disabled:opacity-50 max-md:py-2 dark:bg-neutral-900 dark:text-neutral-300"
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
                            {/* TODO: Figure out why the checkbox is not filling like in V5 */}
                            <input
                                checked={useHeaders}
                                id="use-headers"
                                type="checkbox"
                                value=""
                                className="h-4 w-4 rounded-lg border-neutral-300 bg-neutral-200 text-pink-400 focus:ring-2 focus:ring-pink-400 dark:border-neutral-500 dark:bg-neutral-600 dark:text-pink-600 dark:focus:ring-pink-600"
                                onChange={(e) =>
                                    setUseHeaders(e.target.checked)
                                }
                            />
                            <label
                                htmlFor="use-headers"
                                className="default ml-2 text-sm font-medium"
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
                                className="h-4 w-4 rounded-lg border-neutral-300 bg-neutral-200 text-pink-400 focus:ring-2 focus:ring-pink-400 dark:border-neutral-500 dark:bg-neutral-600 dark:text-pink-600 dark:focus:ring-pink-600"
                                onChange={(e) =>
                                    setLeaveMalformedRows(e.target.checked)
                                }
                            />
                            <label
                                htmlFor="leave-malformed-rows"
                                className="default ml-2 text-sm font-medium"
                            >
                                Leave malformed/duplicated data in the table,
                                but highlight it
                            </label>
                        </div>
                    </section>

                    {errors.length > 0 && (
                        <section className="prose dark:prose-invert">
                            <h2 id="errors">Errors</h2>

                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>
                                        {error.error === "malformed" && (
                                            <>
                                                Some emails are{" "}
                                                <span className="text-red-500">
                                                    malformed
                                                </span>
                                            </>
                                        )}
                                        {error.error === "duplicate" && (
                                            <>
                                                Some emails are{" "}
                                                <span className="text-yellow-500">
                                                    duplicated{" "}
                                                </span>
                                            </>
                                        )}
                                        {error.error === "many-columns" &&
                                            "There are too many columns."}
                                        {error.error === "missing-columns" &&
                                            "There are missing columns."}

                                        {error.message && (
                                            <p>{error.message}</p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {cleanedCsv.length > 0 && (
                        <>
                            <section className="prose max-w-none max-md:hidden dark:prose-invert">
                                <h2 id="testers" className="flex">
                                    <span className="flex-1">
                                        Testers (
                                        {numberWithCommas(
                                            cleanedCsv.length -
                                            (useHeaders ? 1 : 0),
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
                                                    .getElementById("export")
                                                    ?.scrollIntoView({
                                                        behavior: "smooth",
                                                    })
                                            }
                                            className="stroke-gray-500 transition duration-300 hover:scale-125 hover:stroke-pink-700"
                                        />
                                    </button>
                                </h2>

                                <table>
                                    {useHeaders &&
                                        Array.isArray(cleanedCsv[0]) && (
                                            <thead>
                                                <tr>
                                                    {(
                                                        cleanedCsv[0] as string[]
                                                    ).map((header, index) => (
                                                        <th key={index}>
                                                            {header}
                                                        </th>
                                                    ))}
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
                                                )
                                                    .filter(() =>
                                                        leaveMalformedRows
                                                            ? true
                                                            : !(
                                                                !Array.isArray(
                                                                    row,
                                                                ) &&
                                                                [
                                                                    "malformed",
                                                                    "duplicate",
                                                                ].includes(
                                                                    row.flag,
                                                                )
                                                            ),
                                                    )
                                                    .map(
                                                        (
                                                            value,
                                                            columnIndex,
                                                        ) => (
                                                            <td
                                                                key={
                                                                    columnIndex
                                                                }
                                                                className={
                                                                    leaveMalformedRows &&
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

                            <div id="export">
                                <button
                                    type="button"
                                    className="w-full rounded-lg bg-neutral-100 px-4 py-2 text-center text-sm text-neutral-700 transition-colors hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
                                    onClick={() => exportCsv()}
                                >
                                    Export
                                </button>

                                <p className="prose max-w-none text-sm dark:prose-invert">
                                    <strong>Note:</strong> The CSV export will
                                    contain valid results only. When duplicates
                                    exist, only the first email will be
                                    exported.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="w-full rounded-lg bg-neutral-100 px-4 py-2 text-center text-sm text-neutral-700 transition-colors hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
                                onClick={() => clear()}
                            >
                                Clear
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default TestFlightCleaner;
