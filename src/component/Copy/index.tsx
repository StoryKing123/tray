import { FC } from "react";
import { writeText } from "@tauri-apps/api/clipboard";

type CopyProps = {
  text: string;
  className?: string;
};
const Copy: FC<CopyProps> = (props) => {
  const handleCopy = async () => {
    await writeText(props.text);
  };
  return (
    <svg
      className={`icon cursor-pointer ${props.className ?? ""}`}
      onClick={handleCopy}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2778"
      width="12"
      height="12"
    >
      <path
        d="M640 341.333333H128a42.666667 42.666667 0 0 0-42.666667 42.666667v512a42.666667 42.666667 0 0 0 42.666667 42.666667h512a42.666667 42.666667 0 0 0 42.666667-42.666667V384a42.666667 42.666667 0 0 0-42.666667-42.666667z m-42.666667 512H170.666667V426.666667h426.666666v426.666666z"
        fill=""
        p-id="2779"
      ></path>
      <path
        d="M896 85.333333H384a42.666667 42.666667 0 0 0-42.666667 42.666667v128h85.333334V170.666667h426.666666v426.666666h-85.333333v85.333334h128a42.666667 42.666667 0 0 0 42.666667-42.666667V128a42.666667 42.666667 0 0 0-42.666667-42.666667z"
        fill=""
        p-id="2780"
      ></path>
    </svg>
  );
};

export default Copy;
