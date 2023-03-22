import { useEffect, useLayoutEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import "./style.css";
import { register, unregister } from "@tauri-apps/api/globalShortcut";
import { readText } from "@tauri-apps/api/clipboard";
import Translation from "./component/Translation";
import { appWindow } from "@tauri-apps/api/window";
import { show, hide } from "@tauri-apps/api/app";
import { WebviewWindow } from "@tauri-apps/api/window";
import { useSetRecoilState } from "recoil";
import { inputState } from "./store";

function App() {
  //   hide();
//   new WebviewWindow("translate", {
//     url: "translate.html",
//     width: 400,
//     height: 500,
//   });

  useLayoutEffect(() => {
    console.log("use effect");
    // readClipboard();

    register("Option+d", async () => {
      console.log("Shortcut triggered");
      let translateWindow = WebviewWindow.getByLabel("translate");
      console.log(translateWindow);
      if (translateWindow) {
        await translateWindow.show();
        await translateWindow.setFocus();
        translateWindow.emit("paste", { text: "hello" });
        console.log(translateWindow);
      } else {
        let newViewWindow = new WebviewWindow("translate", {
          url: "translate.html",
          width: 400,
          height: 500,
        });
        // newViewWindow.emit("paste",{text:"abcd"})
        // newViewWindow.once("tauri://created", function () {
        newViewWindow.once("tauri://window-created", function () {
          //   setTimeout(() => {
          //     // WebviewWindow.getByLabel("translate")?.emit("paste", {
          //     //   text: "abcds",
          //     // });
          //     newViewWindow.emit("paste", {
          //       text: "123",
          //     });
          //   }, 2000);
          // webview window successfully created
        });
      }
     
    });
    register("Option+s", async () => {
      const localWindow = WebviewWindow.getByLabel("translate");
      const webview = new WebviewWindow("translate", {
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
