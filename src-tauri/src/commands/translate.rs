pub mod translate {
    use std::{collections::HashMap, error::Error};

    use chrono::{Local, NaiveDateTime};
    use reqwest::{
        self,
        header::{HeaderMap, HeaderValue},
        Body,
    };

    #[derive(serde::Deserialize, serde::Serialize, Debug)]
    struct TranslateBody {
        SourceText: String,
        Source: String,
        Target: String,
        ProjectId: u8,
    }

    #[derive(serde::Deserialize, serde::Serialize, Debug)]
    struct TranslateResponse {
        RequestId: String,
        Source: String,
        Target: String,
        TargetText: String,
    }
    #[derive(serde::Deserialize, serde::Serialize, Debug)]
    pub struct TranslateResponseBody {
        Response: TranslateResponse,
    }

    use crate::commands::authorization::{self, authorization::get_authorization};
    pub async fn trnalslate(text: &str) -> Result<(TranslateResponseBody), Box<dyn std::error::Error>> {
        println!("start translate");
        let current_timestamp = Local::now().timestamp();
        println!("{}", current_timestamp);
        let mut header_map = HeaderMap::new();
        let mut map = HashMap::new();
        map.insert("SourceText", text);
        map.insert("Source", "en");
        map.insert("Target", "zh");
        map.insert("ProjectId", "0");
        // let payload = serde_json::to_string(&map).unwrap();
        let payload = format!(
            "{{\"SourceText\":\"{}\",\"Source\":\"en\",\"Target\":\"zh\",\"ProjectId\":0}}",
            text
        );

        let translate_body = TranslateBody {
            SourceText: String::from(text),
            Source: String::from("en"),
            Target: String::from("zh"),
            ProjectId: 0,
        };
        println!("body");
        println!("{:?}", translate_body);
        // println!("{:?}", map);
        println!("payload");
        println!("{:?}", payload);
        let authorization = get_authorization(current_timestamp, &payload);
        println!("authorization:{}", authorization);
        let auth = authorization.as_str();
        // let date = NaiveDateTime::from_timestamp(current_timestamp, 0)
        //     .format("%Y-%m-%d")
        //     .to_string();
        header_map.insert("Authorization", HeaderValue::from_str(auth).unwrap());
        header_map.insert("Content-Type", HeaderValue::from_static("application/json"));
        header_map.insert("Host", HeaderValue::from_static("tmt.tencentcloudapi.com"));
        header_map.insert("X-TC-Action", HeaderValue::from_static("TextTranslate"));
        header_map.insert(
            "X-TC-Timestamp",
            HeaderValue::from_str(current_timestamp.to_string().as_str()).unwrap(),
        );
        header_map.insert("X-TC-Version", HeaderValue::from_static("2018-03-21"));
        header_map.insert("X-TC-Region", HeaderValue::from_static("ap-guangzhou"));
        header_map.insert("X-TC-Language", HeaderValue::from_static("zh-CN"));
        let url = "https://tmt.tencentcloudapi.com";
        let body = reqwest::Client::new()
            .post(url)
            .headers(header_map)
            .json(&translate_body)
            // .json(&array_body)
            .send()
            .await
            .expect("msg")
            .json::<TranslateResponseBody>()
            .await
            .expect("err");
        println!("{:?}", body);
        Ok(body)
    }
}
