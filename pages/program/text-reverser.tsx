import Breadcrumbs from "../../components/Breadcrumbs";
import Head from "next/head";
import InputField from "../../components/InputField";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import type { NextPage } from "next";

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
                <title>Text Reverser | H. Kamran</title>
            </Head>

            <Layout>
                <div className="mx-auto max-w-2xl">
                    <Breadcrumbs
                        basePath="/programs"
                        baseLabel="Programs"
                        currentLabel="Text Reverser"
                    />

                    <div className="space-y-2">
                        <h1 className="text-4xl font-semibold text-center mx-auto md:text-left">
                            Text Reverser
                        </h1>
                        <h2 className="font-light text-xl sm:text-2xl text-center sm:text-left leading-snug text-gray-300">
                            Reverse some text, because why not?
                        </h2>
                    </div>

                    <div className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
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
