import { useRecoilState } from "recoil";
import { translationState } from "../../store";
import * as styles from "./index.css";
import * as commonStyles from "../../common.css";

const Translation = () => {
    console.log("transnlation render");
    const [translation] = useRecoilState(translationState);
    return (
        <div className={`${styles.translation} ${commonStyles.area}`}>
            {translation}
        </div>
    );
};

export default Translation;
