import type { FC, PropsWithChildren } from "react";

type InputOTPProps = PropsWithChildren & {
    id?: string;
    maxLength?: number;
    pattern?: string | RegExp;
};

export const InputOTP: FC<InputOTPProps> = ({ children, id, maxLength, pattern }) => {
    const patternStr = pattern instanceof RegExp ? pattern.source : pattern;
    return (
        <div className="input-otp" id={id} data-max-length={maxLength} data-pattern={patternStr}>
            {children}
        </div>
    );
};

export const InputOTPGroup: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="input-otp-group">
            {children}
        </div>
    );
};

type InputOTPSlotProps = {
    index: number;
};

export const InputOTPSlot: FC<InputOTPSlotProps> = ({ index }) => {
    return (
        <input
            className="input-otp-slot"
            type="text"
            maxLength={1}
            data-index={index}
            inputMode="numeric"
            autoComplete="one-time-code"
        />
    );
};

export const InputOTPSeparator: FC = () => {
    return <span className="input-otp-separator">-</span>;
};
