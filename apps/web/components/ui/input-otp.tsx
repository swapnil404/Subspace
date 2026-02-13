import type { FC, PropsWithChildren } from "hono/jsx";

type InputOTPProps = PropsWithChildren & {
    id?: string;
    maxLength?: number;
    pattern?: string | RegExp;
};

export const InputOTP: FC<InputOTPProps> = ({ children, id, maxLength, pattern }) => {
    const patternStr = pattern instanceof RegExp ? pattern.source : pattern;
    return (
        <div class="input-otp" id={id} data-max-length={maxLength} data-pattern={patternStr}>
            {children}
        </div>
    );
};

export const InputOTPGroup: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div class="input-otp-group">
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
            class="input-otp-slot"
            type="text"
            maxLength={1}
            data-index={index}
            inputMode="numeric"
            autocomplete="one-time-code"
        />
    );
};

export const InputOTPSeparator: FC = () => {
    return <span class="input-otp-separator">-</span>;
};
