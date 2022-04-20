import { useEffect, useState } from "react";
import InputField from "./InputField";

const TextReverseProgram = () => {
    const [text, setText] = useState<string>("");
    const [reversedText, setReversedText] = useState<string | null>(null);

    useEffect(() => {
        if (text) {
            setReversedText(text.split("").reverse().join(""));
        }
    }, [text]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
            <InputField
                type="text"
                placeholder="Text"
                label="Text"
                value={text}
                valueUpdate={(value) => setText(value as string)}
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
                />
            </div>
        </div>
    );
};

export default TextReverseProgram;
