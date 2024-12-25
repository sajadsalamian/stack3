import { Icon } from "@iconify/react";
import { toast, ToastOptions } from "react-toastify";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AnimationVariants = (
  type: string = "y",
  start: number = 10,
  end: number = 0,
  duration: number = 0.8,
  staggerChildren: number = 0.5
) => {
  switch (type) {
    case "y":
      return {
        hidden: { y: `${start}vh`, opacity: 0 },
        visible: {
          y: `${end}vh`,
          opacity: 1,
          transition: {
            ease: "easeOut",
            duration: duration,
          },
        },
      };
    case "x":
      return {
        hidden: { x: `${start}vw`, opacity: 0 },
        visible: {
          x: `${end}vh`,
          opacity: 1,
          transition: {
            ease: "easeOut",
            duration: duration,
          },
        },
      };
    case "upDown":
      return {
        animate: {
          y: ["-10px", "0px", "-10px"], // Loop from 0% to 100% and back to 0%
          transition: {
            duration: 3, // Duration for one loop cycle
            ease: "linear", // Linear easing for smooth motion
            repeat: Infinity, // Repeat the animation infinitely
            repeatType: "loop", // Type of repeat (loop for smooth continuous motion)
          },
        },
      };
    case "leftRight":
      return {
        initial: { x: "-50vw" },
        animate: { x: 0 },
        transition: {
          duration: 1,
          origin: 1,
          delay: 1,
        },
      };
    case "introC":
      return {
        visible: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      };
    case "slideC":
      return {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: duration,
            staggerChildren: staggerChildren,
          },
        },
      };
  }
};

// export const SelectType = {
//     primary:
//         "block w-full rounded-md border-0 py-1.5 text-black ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-primary ring-[#e6e6e6] sm:text-sm sm:leading-6",
// };

export default function IconType({
  type = "view",
  onClick,
  w = 20,
  h = 20,
  className = "",
}) {
  switch (type) {
    case "view":
      return (
        <Icon
          icon="carbon:view-filled"
          className={twMerge("text-gray-600", className)}
          width={w}
          height={h}
          onClick={onClick}
        />
      );
    case "edit":
      return (
        <Icon
          icon="entypo:edit"
          className={twMerge("text-gray-600", className)}
          width={w}
          height={h}
          onClick={onClick}
        />
      );
    case "delete":
      return (
        <Icon
          icon="fluent:delete-28-filled"
          className={twMerge("text-gray-600", className)}
          width={w}
          height={h}
          onClick={onClick}
        />
      );
  }
}

const persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
];
const arabicNumbers = [
  /٠/g,
  /١/g,
  /٢/g,
  /٣/g,
  /٤/g,
  /٥/g,
  /٦/g,
  /٧/g,
  /٨/g,
  /٩/g,
];
export const toEnglishNumber = (str: any) => {
  if (typeof str === "string") {
    for (let i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};

export const Toast = (type: string, text: string, duration = 5000) => {
  const options: ToastOptions = {
    position: "top-right",
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    pauseOnFocusLoss: false,
  };
  switch (type) {
    case "success":
    case "s":
      return toast.success(text, options);
    case "warn":
    case "w":
      return toast.warn(text, options);
    case "info":
    case "i":
      return toast.info(text, options);
    case "error":
    case "e":
      return toast.error(text, options);
  }
};

export const FileSizeFormatter = (size: number) => {
  return size < 1048576
    ? `${(size / 1024).toFixed(2)} KB`
    : `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

export const addCommas = (num: number) =>
  num != null
    ? removeNonNumeric(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : null;

export const removeNonNumeric = (num: number) =>
  num.toString().replace(/[^0-9]/g, "");

export function SetCookie(name: string, value: any, days: number) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function GetCookie(name: string) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export function EraseCookie(name: string) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function SaveCart(item: { id: any }, count: number) {
  let cart = GetCart();
  let objIndex = cart.findIndex(
    (obj: { item: { id: any } }) => obj.item.id == item.id
  );
  if (count >= 0) {
    if (objIndex > -1) {
      cart[objIndex].count = count;
    } else {
      cart.push({ item: item, count: count });
    }
  }
  console.log(item);
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function GetCart() {
  let items = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  return items;
}

export function RemoveCart(id: any) {
  let cart = GetCart();
  var filtered = cart.filter(function (el: { item: { id: any } }) {
    return el.item.id != id;
  });
  localStorage.setItem("cart", JSON.stringify(filtered));
}

export function MakeId({ length = 32 }: { length?: number } = {}): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const UpdateArrayOfObject = (
  items: any[],
  compare: string | number,
  id: string | number,
  filed: string,
  newValue: any
) => {
  const newItems = items.map((item) => {
    if (item.compare === id) {
      return { ...item, filed: newValue };
    }
    return item;
  });
  return newItems;
};

export function FindNestedArray(data: [], field: string, slug: string) {
  function iter(a: { slug: any; children: any[] }) {
    if (a.slug === slug) {
      result = a;
      return true;
    }
    return Array.isArray(a[field]) && a[field].some(iter);
  }
  var result: any;
  data.some(iter);
  return result;
}