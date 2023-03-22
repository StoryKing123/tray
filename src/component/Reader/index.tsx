import { readText } from "@tauri-apps/api/clipboard";
import { invoke } from "@tauri-apps/api/tauri";
import {
  FC,
  KeyboardEventHandler,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRecoilState } from "recoil";
import { useTranslate } from "../../hooks/useTranslate";
import { inputState, translationState } from "../../store";
import { useControllableValue, useEventListener } from "ahooks";
import { autoGrowElementByContent } from "../../utils";
import { AnimatePresence, motion } from "framer-motion";
import Translate from "./Translate";

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
  const [text, translate, isLoading] = useTranslate();

  useEventListener("input", autoGrowElementByContent, { target: inputRef });

  useEffect(() => {
    // console.log("input change");
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
        <Translate
          isLoading={isLoading}
          onClick={() => {
            translate(inputValue ?? "");
          }}
        ></Translate>
      </div>
    </>
  );
};
export default Reader;
