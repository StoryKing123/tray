import { text } from "stream/consumers";

export function autoGrowElementByContent(textarea: InputEvent) {
  if (!textarea.target) return;
  (textarea.target as HTMLTextAreaElement).style.height = "auto";
  (textarea.target as HTMLTextAreaElement).style.height =
    (textarea.target as HTMLTextAreaElement).scrollHeight + "px";
}
