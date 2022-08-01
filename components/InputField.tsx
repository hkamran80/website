import { classNames } from "@hkamran/utility-web";
import type { InputFieldProps } from "../types/input";

const InputField = ({ ...props }: InputFieldProps) => {
    const inputId = `${props.label
        .replaceAll(/[^A-Za-z0-9\s]/g, "")
        .replaceAll(" ", "-")
        .toLowerCase()}-input`;

    return (
        <div
            className={classNames(
                "ƒw-full items-center mb-3",
                props.classes || "",
            )}
        >
            <label
                htmlFor={inputId}
                className="block text-sm font-medium text-gray-400"
            >
                {props.label}
            </label>

            <div className="mt-2 relative rounded-md shadow-sm">
                <input
                    id={inputId}
                    type={props.type}
                    placeholder={props.placeholder}
                    className={classNames(
                        "px-3 py-3 relative bg-hk-grey rounded-lg text-sm border-0 shadow outline-none focus:outline-none w-full appearance-none",
                        !props.disabled ? "focus:ring focus:ring-pink-700" : "",
                        props.svg ? "pr-10" : "",
                        props.copyAll ? "select-all" : "",
                    )}
                    step={props.step}
                    value={props.value}
                    readOnly={props.readonly}
                    aria-readonly={props.readonly}
                    disabled={props.disabled}
                    onChange={async (e) => {
                        const { value } = e.currentTarget;
                        props.valueUpdate(value);
                    }}
                />

                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {props.svg && (
                        <span
                            className="text-gray-400"
                            dangerouslySetInnerHTML={{
                                __html: props.svg,
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default InputField;
