import { environment } from "../../shared";
import { WS_STATUS_CONNECT } from "./web-sockets.enum";
import { getSocketStatus } from "./web-sockets.util";
import { baseUrl } from "./web-sockets.const";

const wsChannel = new WebSocket(environment.REACT_APP_WS_URL || baseUrl);

/** TODO: Дописать реконнект */
export class ApiWebsockets {
  private interval: NodeJS.Timer | undefined;
  private isOpenChannel = false;

  public openChannel<T>(props: T): void {
    wsChannel.onopen = (ev) => {
      console.log("Канал открыт ", this.getStatus());
      this.postMessage(props);
    };
  }

  public reOpenChannel<T>(props: T): void {}

  public disconnect(): void {
    wsChannel.close();
    if (this.getStatus() === WS_STATUS_CONNECT.CLOSED) {
      console.log("Канал закрыт ", this.getStatus());
    } else {
      console.log("Канал в процессе ", this.getStatus());
    }
  }

  public postMessage<T>(props: T): void {
    if (this.getStatus() === WS_STATUS_CONNECT.OPEN) {
      console.log(
        "Отправка сообщения ",
        (props as any)?.method,
        this.getStatus()
      );
      const propsStringify = JSON.stringify(props);
      return wsChannel.send(propsStringify);
    }
  }

  protected subscribeMessage<T>(callback: (ev: MessageEvent<T>) => void) {
    return (wsChannel.onmessage = callback);
  }

  public unsubscribeClose<T>(callback: (ev: CloseEvent) => void) {
    return (wsChannel.onclose = (ev) => {
      this.isOpenChannel = false;
      callback(ev);
    });
  }

  public unsubscribeMessage() {
    return;
  }

  private getStatus(): WS_STATUS_CONNECT {
    return getSocketStatus(wsChannel.readyState);
  }
}

export const apiWebsockets = new ApiWebsockets();
