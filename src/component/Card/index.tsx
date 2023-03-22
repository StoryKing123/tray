import { FC, PropsWithChildren } from "react";
import { text } from "stream/consumers";
import Copy from "../Copy";

type CardProps = { text: string };
const Card: FC<PropsWithChildren<CardProps>> = (props) => {
  return (
    <div
      className={` relative bg-gray-100  min-h-8 break-words p-4 rounded-md `}
    >
      {props.text}
      <Copy className=" absolute bottom-2" text={props.text}></Copy>
    </div>
  );
};

export default Card;
