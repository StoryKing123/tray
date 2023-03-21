import { useRecoilState } from "recoil";
import { translationState } from "../../store";
import * as styles from "./index.css";

const Translation = () => {
  console.log("transnlation render");
  const [translation] = useRecoilState(translationState);
  return (
    <div
      className={` bg-gray-100  min-h-8 break-words p-4 rounded-md ${styles.translation}`}
    >
      {translation}
    </div>
  );
};

export default Translation;
