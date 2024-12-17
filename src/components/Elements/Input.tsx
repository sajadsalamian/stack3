import React from "react";
import { toEnglishNumber } from "../Layouts/Main/Helper";
import { KeyboardEvent } from "react";
import { twMerge } from "tailwind-merge";
import Label from "./Label";

function Input({
  name = "",
  onChange,
  error,
  label,
  type = "text",
  icon = "",
  value,
  required = false,
  placeholder = "",
  className = "",
  parentClass = "",
  onBlur,
  readonly = false,
  labelClass = "",
}) {
  function validate(e) {
    let key =
      e.type === "paste"
        ? e.clipboardData.getData("text/plain")
        : toEnglishNumber(e.key);
    console.log(key);
    if (key !== "Backspace" && key !== "Delete") {
      if (!/[0-9]/.test(key)) {
        e.preventDefault();
      }
    }
  }

  const InputType = {
    primary:
      "block w-full rounded-md border-0 py-3 px-3 text-black ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-primary ring-[#e6e6e6] sm:text-sm sm:leading-6 bg-white",
  };

  return (
    <div className={twMerge("mb-5", parentClass)} onBlur={onBlur}>
      <Label label={label} required={required} />
      <div className="relative">
        <input
          type={type}
          readOnly={readonly}
          name={name}
          id={name}
          className={twMerge(InputType["primary"], className)}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={(e) => (type == "number" ? validate(e) : null)}
        />{" "}
        {icon.length > 0 ? (
          <span className="absolute left-0 top-0 bottom-0 p-2 input-ic rounded-l-md ring-1 ring-inset ring-gray-300">
            {icon}
          </span>
        ) : null}
      </div>
      <span className="text-red-600">{error}</span>
    </div>
  );
}

export default Input;
