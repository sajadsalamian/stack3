import { useEffect } from "react";

const useDocumentTitle = (title = "") => {
  useEffect(() => {
    document.title = title + " - Stack3";
  }, [title]);
};

export default useDocumentTitle;
