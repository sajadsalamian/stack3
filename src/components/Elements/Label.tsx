import { cva } from "class-variance-authority";
import React from "react";

const labelStyle = cva("", {
    variants: {
        variant: {
            primary: ["block text-sm font-medium leading-6 text-gray-900 text-white"],
        },
    },
    defaultVariants: {
        variant: "primary",
    },
});

function Label({ label, variant = "primary", required = false }) {
    return (
        <label className={labelStyle({ variant })}>
            {required && <span className="text-red-800">*</span>} {label}
        </label>
    );
}

export default Label;
