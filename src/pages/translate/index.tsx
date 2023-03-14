import React from "react";
import ReactDOM from "react-dom/client";
// import "./style.css";
import { RecoilRoot } from "recoil";
import Translate from "./translate";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RecoilRoot>
            <Translate />
        </RecoilRoot>
    </React.StrictMode>
);
