import { environment } from "../../shared";
import { WS_STATUS_CONNECT } from "./web-sockets.enum";
import { getSocketStatus } from "./web-sockets.util";
import { baseUrl } from "./web-sockets.const";

const wsChannel = new WebSocket(environment.REACT_APP_WS_URL || baseUrl);

export class ApiWebsockets {
  private interval: NodeJS.Timer | undefined;

  public connect<T>(props: T): void {
    if (this.getStatus() === WS_STATUS_CONNECT.OPEN) {
      return;
    }

    wsChannel.onopen = (ev) => {
      console.log("Канал открыт ", this.getStatus());
      this.postMessage(props);
      this.reConnect(props);
    };
  }

  public reConnect<T>(props: T): void {
    console.log("Реконнект: ", this.getStatus());
    if (this.getStatus() === WS_STATUS_CONNECT.CLOSED) {
      console.log("1: ", this.getStatus());
      this.interval = setInterval(() => this.connect(props), 2_000);
      return;
    }

    if (this.getStatus() === WS_STATUS_CONNECT.OPEN) {
      console.log("2: ", this.getStatus());
      clearInterval(this.interval);
      return;
    }

    if (this.getStatus() === WS_STATUS_CONNECT.CONNECTING) {
      console.log("3: ", this.getStatus());
      clearInterval(this.interval);
      return;
    }
  }

  public disconnect(): void {
    wsChannel.close();
    if (this.getStatus() === WS_STATUS_CONNECT.CLOSED) {
      console.log("Канал закрыт ", this.getStatus());
    } else {
      console.log("Канал в процессе ", this.getStatus());
    }
  }

  public postMessage<T>(props: T): void {
    console.log("Отправка сообщения ", this.getStatus());
    const propsStringify = JSON.stringify(props);
    return wsChannel.send(propsStringify);
  }

  protected subscribeMessage<T>(callback: (ev: MessageEvent<T>) => void) {
    return (wsChannel.onmessage = callback);
  }

  public unsubscribeClose(callback: (ev: CloseEvent) => void) {
    return (wsChannel.onclose = callback);
  }

  public unsubscribeMessage() {
    return;
  }

  private getStatus(): WS_STATUS_CONNECT {
    return getSocketStatus(wsChannel.readyState);
  }
}

export const apiWebsockets = new ApiWebsockets();
