import { useEffect, useRef } from "react";

export const useDocumentTitle = (title: string, isUnmount: boolean = true) => {
  const oldTitle = useRef(document.title).current;
  /* 
    页面加载时：旧title
    页面加载后：新title
  */
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (isUnmount) {
        document.title = oldTitle;
      }
    };
  }, [isUnmount, oldTitle]);
};
