import type { FC, PropsWithChildren } from "react";

type FieldProps = PropsWithChildren & {
    class?: string;
};

export const Field: FC<FieldProps> = ({ children, class: className }) => {
    return (
        <div className={`field ${className ?? ""}`}>
            {children}
        </div>
    );
};

type FieldLabelProps = PropsWithChildren & {
    htmlFor?: string;
};

export const FieldLabel: FC<FieldLabelProps> = ({ children, htmlFor }) => {
    return (
        <label className="field-label" htmlFor={htmlFor}>
            {children}
        </label>
    );
};
