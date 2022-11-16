import { FC, useState } from "react";
import { useWebsockets } from "../../shared";

export const WsContainer: FC = () => {
  const [data, setData] = useState<{ message: string }>({ message: "" });
  const { sendData, onOpen, getMessage } = useWebsockets();

  onOpen();
  getMessage();

  return (
    <div>
      <input
        type="text"
        value={data.message}
        onChange={(e) => setData({ message: e.currentTarget.value })}
      />
      <button onClick={() => sendData(data)}>Send data</button>
    </div>
  );
};
