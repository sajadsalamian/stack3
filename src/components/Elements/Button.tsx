import { Icon } from "@iconify/react";
import { cva } from "class-variance-authority";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export const buttonStyle = cva(
  "rounded-md px-4  py-2 text-base font-semibold shadow-sm relative text-center",
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-black hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        ],
        primary2: [
          "bg-primary  text-black hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        ],
        secondary: ["bg-secondary text-black"],
        white_outline: ["text-black border border-black"],
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
  onClick = new Function(),
  disabled = false,
}) {
  return type != "b" ? (
    <Link to={link} className={twMerge(buttonStyle({ variant }), className)}>
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
      className={twMerge(
        buttonStyle({ variant }),
        className,
        disabled && "bg-gray-700 text-gray-500"
      )}
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
