import { FC, useCallback, useState } from "react";
import { useWebsockets, WS_MESSAGE_METHODS } from "../../shared";

interface DataModel {
  method: WS_MESSAGE_METHODS;
  id: number;
  userName: string;
}

export const WsContainer: FC = () => {
  const [data, setData] = useState("Harry");
  const { sendMessage, onOpen, getMessage, isOpen, isConnect } =
    useWebsockets();

  onOpen();
  getMessage();

  const handleClick = useCallback(() => {
    console.log({ isOpen, isConnect });
    if (isConnect) {
      sendMessage({
        id: 1,
        userName: data,
        method: WS_MESSAGE_METHODS.MESSAGE,
      } as DataModel);
    }
  }, [data]);

  return (
    <div>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.currentTarget.value)}
      />
      <button onClick={handleClick}>Send data</button>
    </div>
  );
};
