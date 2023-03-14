import useSWR from 'swr';
import axios from 'axios'
import { invoke } from '@tauri-apps/api/tauri'

export const useTranslate = (str: string) => {
    console.log('use')
    // const encodedParams = new URLSearchParams();
    // encodedParams.append("q", str);
    // encodedParams.append("target", "zh-cn");
    // encodedParams.append("source", "en");


    const options = {
        method: 'POST',
        url: 'https://tmt.ap-guangzhou.tencentcloudapi.com',
        headers: {
            'content-type': 'application/json',
            "Authorization": "TC3-HMAC-SHA256 Credential=AKIDd9CUEucyVj5i1eQ_D_qZoVq1PAJTPZLLuirUIz2CglwwCQbG7wa1Jyn-QHrwcxBW/2023-01-24/tmt/tc3_request, SignedHeaders=content-type;host, Signature=2222ef9ca3c23a3341f37c75f1f0fe12ca943bd9632a84301590f5032f9992fa",
            "X-TC-Action": 'TextTranslate',
            'X-TC-Timestamp': '1674561258',
            'X-TC-Version': '2018-03-21',
            'X-TC-Region': 'ap-guangzhou'
        },
        // data: encodedParams
        data: { SourceText: "hello", Source: "auto", Target: "zh", ProjectId: 0 }
    };
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages'
    const translateFetch = (url: string) => axios.request<any, { data: { data: { translations: { translatedText: string }[] } } }>(options).then(res => res.data.data.translations)
    // const fetcher = (url: string) => fetch(url).then(r => r.json())
    console.log('start use swr')
    // const { data, error, isLoading } = useSWR([url], translateFetch)
    // translateFetch(url);
    console.log('done')
    // const translateFetch = (query: string) => fetch(
    //     "https://google-translate1.p.rapidapi.com/language/translate/v2",
    //     options
    // ).then((response) => response.json())
    // const { data, error, isLoading } = useSWR('translate', translateFetch)
    // console.log(data)
    // return { data, error, isLoading }
};