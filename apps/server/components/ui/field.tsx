import type { FC, PropsWithChildren } from "hono/jsx";

type FieldProps = PropsWithChildren & {
    class?: string;
};

export const Field: FC<FieldProps> = ({ children, class: className }) => {
    return (
        <div class={`field ${className ?? ""}`}>
            {children}
        </div>
    );
};

type FieldLabelProps = PropsWithChildren & {
    htmlFor?: string;
};

export const FieldLabel: FC<FieldLabelProps> = ({ children, htmlFor }) => {
    return (
        <label class="field-label" for={htmlFor}>
            {children}
        </label>
    );
};
