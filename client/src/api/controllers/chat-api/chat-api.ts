import { WS_MESSAGE_METHODS } from "./chat-api.enum";
import { SubscribeMessageArgs } from "./chat-api.model";
import { ApiWebsockets } from "../../web-sockets";

class ChatApi extends ApiWebsockets {
  subscribeAllMessage<T extends { method: WS_MESSAGE_METHODS }>(
    args?: SubscribeMessageArgs<T>
  ) {
    const {
      CONNECTION,
      DISCONNECTION,
      MESSAGE,
      TYPING_START,
      TYPING_END,
      NONE,
    } = args || {};
    const subscribeHandler = (ev: MessageEvent) => {
      const dataParse: T = JSON.parse(ev.data);

      switch (dataParse.method) {
        case WS_MESSAGE_METHODS.CONNECTION:
          CONNECTION!(dataParse);
          break;

        case WS_MESSAGE_METHODS.DISCONNECTION:
          DISCONNECTION!(dataParse);
          break;

        case WS_MESSAGE_METHODS.MESSAGE:
          MESSAGE!(dataParse);
          break;

        case WS_MESSAGE_METHODS.TYPING_START:
          TYPING_START!(dataParse);
          break;

        case WS_MESSAGE_METHODS.TYPING_END:
          TYPING_END!(dataParse);
          break;

        default:
          NONE!();
          break;
      }
    };
    this.subscribeMessage(subscribeHandler);
  }
}

export const chatApi = new ChatApi();
