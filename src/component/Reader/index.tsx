import { readText } from "@tauri-apps/api/clipboard";
import { invoke } from "@tauri-apps/api/tauri";
import { KeyboardEventHandler, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useTranslate } from "../../hooks/useTranslate";
import { inputState, translationState } from "../../store";
import * as styles from "./index.css";
import * as commonStyles from "../../common.css";
import { WebviewWindow } from "@tauri-apps/api/window";

const Reader = () => {
    const [input, setInput] = useRecoilState(inputState);
    const [_, setTranslation] = useRecoilState(translationState);
    const inputRef = useRef<HTMLInputElement>(null);
    const initReader = async () => {
        // const clipboardText = await readText();
        // console.log(clipboardText);
        // setInput(clipboardText ?? "");
        const data: TranslateResponse = await invoke("translate", {
            text: input,
        });
        if (data) {
            console.log("set translation:" + data.Response.TargetText);
            setTranslation(data.Response.TargetText);
        }
        console.log(data);
    };
    console.log('input')
    console.log(input)
    useEffect(() => {
        // alert(input)
        console.log("run use effect");
        initReader();
    }, [input]);
    const handleTranslate = () => {
        setInput(inputRef.current?.value ?? "");
    };
    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        console.log(e)
        if (e.code === "Enter") {
            handleTranslate();
        }
    };

    return (
        <>
            {/* <textarea name="" id="" cols={30} rows={10}></textarea> */}
            <input
                className={`${styles.reader} ${commonStyles.area}`}
                type="text"
                ref={inputRef}
                defaultValue={input}
                onKeyDown={handleKeyDown}
            />
            {/* <button onClick={handleTranslate}>translate</button> */}
        </>
    );
};
export default Reader;
