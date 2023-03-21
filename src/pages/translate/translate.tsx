import { useEffect, useMemo, useState } from "react";
import Reader from "../../component/Reader";
import Translation from "../../component/Translation";
// import * as styles from "./translate.css";
import { WebviewWindow } from "@tauri-apps/api/window";
import { useSetRecoilState } from "recoil";
import { inputState } from "../../store";
import { emit, listen } from "@tauri-apps/api/event";
import { useTranslate } from "../../hooks/useTranslate";
import { readText } from "@tauri-apps/api/clipboard";

const Translate = () => {
  console.log("page render");
  const setInput = useSetRecoilState(inputState);

  const [text, translate] = useTranslate();
  const [inputValue, setInputValue] = useState("");

  let unlisten: Function | null;
  const init = async () => {
    unlisten = await listen("paste", async (e) => {
      console.log("paste");
      console.log(e);
      const clipboardText = await readText();
      console.log(clipboardText);
      setInput(clipboardText ?? "");
      setInputValue(clipboardText ?? "");
      translate(clipboardText ?? "");
    });
  };
  useEffect(() => {
    init();
    return () => {
      async () => {
        unlisten && unlisten();
      };
    };
  }, []);

  const TranslationMemo = useMemo(() => {
    return <Translation></Translation>;
  }, [text]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <Reader onChange={setInputValue} value={inputValue}></Reader>
      {TranslationMemo}
      {/* <TranslationMemo></TranslationMemo> */}
    </div>
  );
};

export default Translate;
