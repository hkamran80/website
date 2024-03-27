import Head from "next/head";
import { useEffect, useState } from "react";

import DynamicHeader from "@/components/DynamicHeader";
import InputField from "@/components/InputField";
import Layout from "@/components/Layout";
import { programs } from "@/data/programs";
import type { NextPage } from "next";
import type { Page } from "@/types/pages";

const metadata = programs.find(({ id }) => id === "duck-compose") as Page;

const TextReverseProgram: NextPage = () => {
    const [duckEmail, setDuckEmail] = useState<string>("");
    const [toEmail, setToEmail] = useState<string>("");
    const [composedEmail, setComposedEmail] = useState<string | null>(null);

    useEffect(() => {
        if (
            duckEmail &&
            toEmail &&
            duckEmail.includes("@") &&
            toEmail.includes("@")
            // duckEmail.split("@").slice(-1).includes(".") &&
            // toEmail.split("@").slice(-1).includes(".")
        )
            setComposedEmail(toEmail.replace("@", "_at_") + "_" + duckEmail);
        else setComposedEmail("");
    }, [duckEmail, toEmail]);

    return (
        <>
            <Head>
                <title>{metadata.name} | H. Kamran</title>
            </Head>

            <Layout>
                <div className="mx-auto max-w-2xl">
                    <DynamicHeader
                        id={metadata.id}
                        name={metadata.name}
                        description={metadata.description}
                    />

                    <div className="mt-6">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">
                            <InputField
                                type="text"
                                placeholder="name@duck.com"
                                label="Duck Address"
                                value={duckEmail}
                                valueUpdate={(value) =>
                                    setDuckEmail(value as string)
                                }
                                classes="md:col-span-2"
                            />

                            <InputField
                                type="text"
                                placeholder="recipient@example.com"
                                label="To Email"
                                value={toEmail}
                                valueUpdate={(value) =>
                                    setToEmail(value as string)
                                }
                                classes="md:col-span-2"
                            />

                            <div className="md:col-span-2">
                                <hr
                                    className="mb-4"
                                    style={{
                                        border: 0,
                                        height: "1px",
                                        background: "#374151",
                                    }}
                                />

                                <InputField
                                    type="text"
                                    placeholder="recipient_at_example.com_name@duck.com"
                                    label="Send Email to"
                                    value={composedEmail || ""}
                                    disabled
                                    copyAll
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default TextReverseProgram;
