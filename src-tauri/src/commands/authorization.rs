type HMacGenericArray = crypto_common::generic_array::GenericArray<
    u8,
    crypto_common::typenum::UInt<
        crypto_common::typenum::UInt<
            crypto_common::typenum::UInt<
                crypto_common::typenum::UInt<
                    crypto_common::typenum::UInt<
                        crypto_common::typenum::UInt<
                            crypto_common::typenum::UTerm,
                            crypto_common::typenum::B1,
                        >,
                        crypto_common::typenum::B0,
                    >,
                    crypto_common::typenum::B0,
                >,
                crypto_common::typenum::B0,
            >,
            crypto_common::typenum::B0,
        >,
        crypto_common::typenum::B0,
    >,
>;
struct Payload {
    SmsSdkAppId: String,
}

pub mod authorization {
    use super::HMacGenericArray;
    use chrono::prelude::*;
    use chrono::{DateTime, NaiveDateTime, Utc};
    use crypto_common::generic_array::GenericArray;
    use hex;
    use hmac::{Hmac, Mac};
    use serde::{Deserialize, Serialize};
    use sha2::{Digest, Sha256};
    use std::hash;
    extern crate dotenv;
    use dotenv::dotenv;
    use std::env;
   

    struct payload {
        source_text: String,
        surce: String,
        target: String,
        project_id: u8,
    }

    pub fn get_authorization(timestamp: i64, payload: &str) -> String {
        // println!("Hello, world!");
        let secret_id = dotenv!("SECRET_ID");
        let secret_key = dotenv!("SECRET_KEY");
        let endpoint = "tmt.tencentcloudapi.com";
        let service = "tmt";
        // let region = "ap-guangzhou";
        // let action = "DescribeInstances";
        // let version = "2017-03-12";
        // let date = Local::now().format("%Y-%m-%d %H:%M:%S");
        // let date = Local::now().format("%Y-%m-%d");
        let date = NaiveDateTime::from_timestamp(timestamp, 0)
        .format("%Y-%m-%d")
        .to_string();
        // let date = DateTime::<Utc>::from_utc(n_date, Utc).format("%Y");
        // .format("%Y-%m-%d");
        // let timestamp_i64 = 1657113606;
        // let naive_date_time = NaiveDateTime::from_timestamp_millis(timestamp_i64).unwrap();
        // let date_time = DateTime::<Utc>::from_utc(naive_date_time, Utc);
        // let date_time = Utc::timestamp_opt(, nsecs)
        // println!("{:?}", date);

        let signed_headers = "content-type;host";
        // let payload = Payload {
        // SmsSdkAppId: String::from("123123"),
        // };

        // let payload = "{\"Limit\": 1, \"Filters\": [{\"Values\": [\"\\u672a\\u547d\\u540d\"], \"Name\": \"instance-name\"}]}";
        // let payload = '{"Limit": 1, "Filters": [{"Values": ["\\u672a\\u547d\\u540d"], "Name": "instance-name"}]}';
        // let payload_string = serde_json::to_string(&payload).unwrap();
        println!("payload");
        println!("{:?}",payload);
        let hashed_request_payload = get_hash(payload);

        // println!("{}", hashed_request_payload);
        // let hashed_request_payload = "";
        // get_hash("123123");
        let http_request_method = "POST";
        let canonical_uri = "/";
        let canonical_query_string = "";
        let canonical_headers = format!(
            "{}{}{}{}",
            "content-type:application/json\n", "host:", endpoint, "\n"
        );
        let canonical_request = format!(
            "{}\n{}\n{}\n{}\n{}\n{}",
            http_request_method,
            canonical_uri,
            canonical_query_string,
            canonical_headers,
            signed_headers,
            hashed_request_payload
        );
        println!("=======canonical request");
        println!("{}", canonical_request);

        let algorithm = "TC3-HMAC-SHA256";
        let hashed_canonical_request = get_hash(&canonical_request);
        let credential_scope = format!("{}/{}/tc3_request", date, service);
        let string_to_sign = format!(
            "{}\n{}\n{}\n{}",
            algorithm, timestamp, credential_scope, hashed_canonical_request
        );

        let k_date = hmac_retur_bytes(&date, &format!("TC3{}", secret_key));
        // println!("{}", k_date);
        // println!("{:?}", k_date.as_bytes());
        let k_service = hmac_by_bytes_return_bytes(service, k_date);
        let k_signing = hmac_by_bytes_return_bytes("tc3_request", k_service);
        let signature = hmac_to_hex(&string_to_sign, k_signing);
        // println!("{}", signature);
        let authorization = String::from(format!(
            "{} Credential={}/{}, SignedHeaders={}, Signature={}",
            algorithm, secret_id, credential_scope, signed_headers, signature
        ));
        println!("{}", authorization);
        authorization
    }

    fn get_hash(str: &str) -> String {
        let mut hasher = Sha256::new();
        hasher.update(&str.as_bytes());
        let hash = hasher.finalize();
        format!("{:x}", hash)
    }

    fn hmac(str: &str, secret_key: &str) -> String {
        // Create alias for HMAC-SHA256
        // let hmac = HmacSha256::mac(str, secret_key);
        // println!("{}", str);
        // println!("{}", secret_key);
        type HmacSha256 = Hmac<Sha256>;
        let mut mac = HmacSha256::new_from_slice(secret_key.as_bytes())
            .expect("HMAC can take key of any size");
        mac.update(str.as_bytes());
        let result = mac.finalize().into_bytes();
        let result_str = hex::encode(&result);
        // println!("{}", result_str);
        result_str
    }

    fn hmac_by_bytes_return_bytes(str: &str, secret_key: HMacGenericArray) -> HMacGenericArray {
        type HmacSha256 = Hmac<Sha256>;
        let mut mac = HmacSha256::new_from_slice(secret_key.as_slice()).expect("err");
        mac.update(str.as_bytes());
        let result = mac.finalize().into_bytes();
        result
    }

    fn hmac_to_hex(str: &str, byte: HMacGenericArray) -> String {
        String::from(hex::encode(hmac_by_bytes_return_bytes(str, byte)))
    }

    fn hmac_retur_bytes<'a>(str: &'a str, secret_key: &'a str) -> HMacGenericArray {
        type HmacSha256 = Hmac<Sha256>;
        let mut mac = HmacSha256::new_from_slice(secret_key.as_bytes())
            .expect("HMAC can take key of any size");
        mac.update(str.as_bytes());
        let result = mac.finalize().into_bytes();
        result
    }
}
