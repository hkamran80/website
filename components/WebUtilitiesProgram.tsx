import { useEffect, useState } from "react";
import InputField from "./InputField";

const WebUtilitiesProgram = () => {
    const [userAgent, setUserAgent] = useState<string>("");

    useEffect(() => {
        if (navigator) {
            setUserAgent(navigator.userAgent);
        }
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
            <div className="md:col-span-2">
                <InputField
                    type="text"
                    placeholder="User Agent"
                    label="User Agent"
                    value={userAgent}
                    valueUpdate={(value) => {}}
                    readonly
                />
            </div>
        </div>
    );
};

export default WebUtilitiesProgram;
