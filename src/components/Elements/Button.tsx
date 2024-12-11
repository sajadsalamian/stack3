import React, { ComponentProps } from "react";
import { Icon } from "@iconify/react";
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const buttonStyle = cva(
    "rounded-md px-8  py-3 text-sm font-semibold shadow-sm relative ",
    {
        variants: {
            variant: {
                primary: [
                    "bg-primary  text-white hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                ],
                primary2: [
                    "bg-primary  text-white hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                ],
                secondary: ["bg-secondary text-white"],
                white_outline: ["text-white border border-white"],
                primary_outline: ["text-primary border border-primary"],
                secondary_outline: ["text-secondary border border-secondary"],
                none: ["shadow-none"],
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    }
);

export default function Button({
    type = "b",
    label = "",
    link = "",
    variant = "primary",
    className = "",
    icon = false,
    iconLeft = true,
    iconName = "teenyicons:arrow-left-outline",
    hFlip = false,
    badge = "",
    onClick,
    disabled = false
}) {
    return type != "b" ? (
        <Link
            href={link}
            className={twMerge(buttonStyle({ variant }), className)}
        >
            {icon && !iconLeft ? (
                <Icon
                    icon={iconName}
                    className="inline-block w-5 h-5  ml-1"
                    hFlip={hFlip}
                />
            ) : null}
            {label}
            {icon && iconLeft ? (
                <Icon
                    icon={iconName}
                    className="inline-block w-5 h-5  mr-1"
                    hFlip={hFlip}
                />
            ) : null}
            {badge.length > 0 && (
                <span className="absolute top-1 right-0 text-xs size-4 bg-primary text-white rounded-full">
                    {badge}
                </span>
            )}
        </Link>
    ) : (
        <button
            type="button"
            className={twMerge(buttonStyle({ variant }), className)}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && !iconLeft ? (
                <Icon
                    icon={iconName}
                    className="inline-block w-5 h-5  ml-1"
                    hFlip={hFlip}
                />
            ) : null}
            {label}
            {icon && iconLeft ? (
                <Icon
                    icon={iconName}
                    className="inline-block w-5 h-5  mr-1"
                    hFlip={hFlip}
                />
            ) : null}
            {badge.length > 0 && (
                <span className="absolute top-1 right-0 text-xs size-4 bg-primary text-white rounded-full text-center">
                    {badge}
                </span>
            )}
        </button>
    );
}
