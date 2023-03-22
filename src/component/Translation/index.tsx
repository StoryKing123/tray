import { useRecoilState } from "recoil";
import { translationState } from "../../store";
import Card from "../Card";
import Copy from "../Copy";
import * as styles from "./index.css";

const Translation = () => {
  console.log("transnlation render");
  const [translation] = useRecoilState(translationState);
  return (
    <Card text={translation}></Card>
    // <div
    //   className={` relative bg-gray-100  min-h-8 break-words p-4 rounded-md ${styles.translation}`}
    // >
    //   {translation}
    //   <Copy className=" absolute bottom-2" text={translation}></Copy>
    // </div>
  );
};

export default Translation;
