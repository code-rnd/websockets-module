export enum WS_STATUS_CONNECT {
  /** Сокет создан. Соединение еще не открыто */
  CONNECTING = "CONNECTING",
  /** Соединение открыто и готово к общению */
  OPEN = "OPEN",
  /** Соединение находится в процессе закрытия */
  CLOSING = "CLOSING",
  /** Соединение закрыто или не может быть открыто */
  CLOSED = "CLOSED",
}
