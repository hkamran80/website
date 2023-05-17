import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import Head from "next/head";
import InputField from "@/components/InputField";
import Layout from "@/components/Layout";
import DynamicHeader from "@/components/DynamicHeader";
import { programs } from "@/data/programs";
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import type { Page } from "@/types/pages";

const metadata = programs.find(
    ({ id }) => id === "overall-grade-after-final-calculator",
) as Page;

const TextReverseProgram: NextPage = () => {
    const [text, setText] = useState<string>("");
    const [reversedText, setReversedText] = useState<string | null>(null);

    useEffect(() => {
        if (text) {
            setReversedText(text.split("").reverse().join(""));
        }
    }, [text]);

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
                                placeholder="Text"
                                label="Text"
                                value={text}
                                valueUpdate={(value) =>
                                    setText(value as string)
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
                                    placeholder="Reversed Text"
                                    label="Reversed Text"
                                    value={reversedText || ""}
                                    valueUpdate={(value) => {}}
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
