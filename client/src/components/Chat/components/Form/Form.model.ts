import { WS_MESSAGE_METHODS } from "../../../../api";

export interface FormProps {
  text: string;
  setText: any;
  onSubmit: (method: WS_MESSAGE_METHODS) => void;
}
