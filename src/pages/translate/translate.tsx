import { useEffect } from "react";
import Reader from "../../component/Reader";
import Translation from "../../component/Translation";
import * as styles from "./translate.css";
import { WebviewWindow } from "@tauri-apps/api/window";
import { useSetRecoilState } from "recoil";
import { inputState } from "../../store";
import { emit, listen } from "@tauri-apps/api/event";

const Translate = () => {
    const setInput = useSetRecoilState(inputState);
    const init = async () => {
        const currentWindow = WebviewWindow.getByLabel("theUniqueLabel");
        let unlistener = await listen("paste", (e) => {
            alert(1)
            console.log("paste");
            console.log(e);
        });
        console.log(unlistener);
        await currentWindow?.listen("paste", (e) => {
            alert(2)
            console.log("paste!");
            console.log(e);
        });

        const unlisten = await listen("click", (event) => {
            console.log("click click");
            // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
            // event.payload is the payload object
        });

        // emits the `click` event with the object payload
        emit("click", {
            theMessage: "Tauri is awesome!",
        });
        console.log(currentWindow);

    };
    useEffect(() => {
        init();
        return () => {};
    }, []);

    return (
        <div className={`${styles.translate}`}>
            <Reader></Reader>
            <Translation></Translation>
        </div>
    );
};

export default Translate;
