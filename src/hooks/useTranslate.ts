import useSWR from "swr";
import axios from "axios";
import { invoke } from "@tauri-apps/api/tauri";
import { useRecoilState } from "recoil";
import { translationState } from "../store";
import { useState } from "react";

export const useTranslate = (): [string, Function, boolean] => {
  // const [isLoading, error] = useState([false, ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setTranslation] = useRecoilState(translationState);
  const translate = async (str: string) => {
    // return new Promise(resove=>)
    setIsLoading(true);
    try {
      const data: TranslateResponse = await invoke("translate", {
        text: str,
      });
      console.log(data);
      if (data) {
        console.log("set translation:" + data.Response.TargetText);
        setTranslation(data.Response.TargetText);
      }
      console.log(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return [text, translate, isLoading];
};
