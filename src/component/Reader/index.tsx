import { readText } from "@tauri-apps/api/clipboard";
import { invoke } from "@tauri-apps/api/tauri";
import { FC, KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { useTranslate } from "../../hooks/useTranslate";
import { inputState, translationState } from "../../store";
import { useControllableValue, useEventListener } from "ahooks";
import { autoGrowElementByContent } from "../../utils";
import { AnimatePresence, motion } from "framer-motion";

type ReaderProps = {
  value: string;
  onChange: any;
};
const Reader: FC<ReaderProps> = (props) => {
  console.log("reader render");
  const [input, setInput] = useRecoilState(inputState);
  const [inputValue, setInputValue] = useControllableValue<string>(props, {
    defaultValue: "",
  });
  const [textareaHeight, setTextareaHeight] = useState("auto");

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [text, translate] = useTranslate();

  useEventListener("input", autoGrowElementByContent, { target: inputRef });

  useEffect(() => {
    console.log("input change");
    // inputRef.current?. = input
    return () => {};
  }, [input]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      translate(inputRef.current?.value);
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.textarea
          className="resize-none  bg-gray-100 rounded-md outline-none p-2  overflow-hidden"
          transition={{ duration: 0.1 }}
          initial={{ height: "auto" }}
          animate={{ height: textareaHeight }}
          cols={2}
          rows={3}
          ref={inputRef}
          value={inputValue}
          onChange={(e) => {
            const { scrollHeight } = e.target;
            setTextareaHeight(`${scrollHeight}px`);
            setInputValue(e.target.value);
          }}
        ></motion.textarea>
      </AnimatePresence>
      <div className="flex justify-center items-center">
        <div
          onClick={() => {
            translate(inputValue ?? "");
          }}
          className=" hover:bg-sky-200  active:bg-sky-50 bg-sky-500 rounded-xl w-40 h-10  text-white flex  justify-center  items-center cursor-pointer"
        >
          翻译
        </div>
      </div>
    </>
  );
};
export default Reader;
