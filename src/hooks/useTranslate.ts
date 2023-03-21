import useSWR from "swr";
import axios from "axios";
import { invoke } from "@tauri-apps/api/tauri";
import { useRecoilState } from "recoil";
import { translationState } from "../store";

export const useTranslate = (): [string, Function] => {
  const [text, setTranslation] = useRecoilState(translationState);
  const initReader = async (str: string) => {
    const data: TranslateResponse = await invoke("translate", {
      text: str,
    });
    console.log(data)
    if (data) {
      console.log("set translation:" + data.Response.TargetText);
      setTranslation(data.Response.TargetText);
    }
    console.log(data);
  };
  return [text, initReader];
};
