import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Reader from "./component/Reader";
import { register, unregister } from "@tauri-apps/api/globalShortcut";
import { readText } from "@tauri-apps/api/clipboard";
import Translation from "./component/Translation";
import { appWindow } from "@tauri-apps/api/window";
import { show, hide } from "@tauri-apps/api/app";
import { WebviewWindow } from "@tauri-apps/api/window";
import { useSetRecoilState } from "recoil";
import { inputState } from "./store";

function App() {
    let setInput = useSetRecoilState(inputState);
    // hide();

    useEffect(() => {
        console.log("use effect");
        readClipboard();
        register("Option+d", async () => {
            console.log("Shortcut triggered");
            let translateWindow = WebviewWindow.getByLabel("theUniqueLabel");
            console.log(translateWindow);
            if (translateWindow) {
                await translateWindow.show();
                await translateWindow.setFocus();
                translateWindow.emit("paste", { text: "hello" });
                console.log(translateWindow);
            } else {
                let newViewWindow = new WebviewWindow("theUniqueLabel", {
                    url: "translate.html",
                    width: 400,
                    height: 500,
                });
                newViewWindow.once("tauri://created", function () {
                    console.log("created");
                    newViewWindow.emit("paste", {
                        text: "123",
                    });
                    console.log(newViewWindow);
                    // webview window successfully created
                });
            }
            // webview.listen("paste", (e) => {
            //     console.log(e);
            // });
            // console.log(webview);
            // const clipboardText = await readText();
            // console.log("emit");
            // console.log(clipboardText);
            // console.log(webview);
            // localWindow?.emit("paste", { text: clipboardText });

            // console.log(clipboardText);
            // setInput(clipboardText ?? "");

            // await hide();
        });
        register("Option+s", async () => {
            const localWindow = WebviewWindow.getByLabel("theUniqueLabel");
            const webview = new WebviewWindow("theUniqueLabel", {
                url: "translate.html",
                width: 400,
                height: 500,
            });
        });
        return () => {
            console.log("unregister");
            unregister("Option+d");
            unregister("Option+s");
        };
    }, []);
    const readClipboard = async () => {
        const clipboardText = await readText();
        console.log(clipboardText);
    };

    return (
        <div className="container">
            app main
            {/* <Reader></Reader>
            <Translation></Translation> */}
        </div>
    );
}

export default App;
