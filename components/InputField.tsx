import { classNames } from "@hkamran/utility-web";
import { slugify } from "@hkamran/utility-strings";
import type { InputFieldProps } from "../types/input";

const InputField = ({ ...props }: InputFieldProps) => {
    const inputId = `${slugify(props.label)}-input`;

    return (
        <div
            className={classNames(
                "w-full mb-3 items-center",
                props.classes || "",
            )}
        >
            <label
                htmlFor={inputId}
                className="block text-sm font-medium text-gray-400"
            >
                {props.label}
            </label>

            <div className="relative mt-2 rounded-md shadow-sm">
                <input
                    id={inputId}
                    type={props.type}
                    placeholder={props.placeholder}
                    className={classNames(
                        "relative w-full appearance-none rounded-lg border-0 bg-hk-grey px-3 py-3 text-sm shadow outline-none focus:outline-none",
                        !props.disabled ? "focus:ring focus:ring-pink-400" : "",
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

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
