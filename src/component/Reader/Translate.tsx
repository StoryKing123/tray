import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslate } from "../../hooks/useTranslate";

type TranslateButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isLoading:boolean
};
const Translate: FC<TranslateButtonProps> = (props) => {
//   const [_, translate, isLoading] = useTranslate();
  //   const handleClick = () => {
  //     translate("hello");
  //   };

  return (
    <motion.button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={props.onClick}
    >
      {props.isLoading ? <Spin size={32} color="#fff" /> : "翻译"}
    </motion.button>
  );
};

export default Translate;

function Spin({ size, color }: { size: number; color: string }) {
  const variants = {
    spin: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={size / 4}
        stroke={color}
        strokeWidth={size / 8}
        fill="none"
        variants={variants}
        animate="spin"
      />
    </motion.svg>
  );
}
