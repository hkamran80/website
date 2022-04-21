type InputFieldType = "text" | "number";

export type InputFieldProps = {
    type: InputFieldType;
    placeholder: string;
    label: string;
    value: string | number | undefined;
    valueUpdate: (value: string | number) => void;
    classes?: string;
    svg?: string;
    step?: string | number;
    readonly?: boolean;
    disabled?: boolean;
    copyAll?: boolean;
};
