import {
  FC,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Chat, Form, TypingLabel } from "../Chat";
import { MessageModel, rndHash } from "../WsContainer";
import { chatApi, WS_MESSAGE_METHODS } from "../../api/controllers";

const mockMessage = {
  messageId: "messageId_123",
  sessionId: "sessionId_123",
  method: WS_MESSAGE_METHODS.CONNECTION,
  date: new Date(),
};

/** TODO: вьюха для теста, все перевести в редакс или react-квери */
export const View: FC = memo(() => {
  const [name] = useState(rndHash + "_salt");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [typingUser, setTypingUser] = useState<MessageModel>();
  const userId = rndHash;

  const sendMessageHandler = useCallback(
    (method: WS_MESSAGE_METHODS) => {
      const message: MessageModel = {
        userId,
        user: name,
        messageId: (+new Date()).toString(16),
        method,
        date: new Date(),
        text,
      };

      chatApi.postMessage<MessageModel>(message);
      if (method === WS_MESSAGE_METHODS.MESSAGE) {
        setText("");
      }
    },
    [userId, name, text]
  );

  useLayoutEffect(() => {
    chatApi.connect(mockMessage);
  });

  useEffect(() => {
    if (!text) {
      sendMessageHandler(WS_MESSAGE_METHODS.TYPING_END);
      return;
    }

    const interval = setInterval(() => {
      sendMessageHandler(WS_MESSAGE_METHODS.TYPING_START);
    }, 500);

    return () => clearInterval(interval);
  }, [text, name, sendMessageHandler]);

  useEffect(() => {
    chatApi.subscribeAllMessage<MessageModel>({
      [WS_MESSAGE_METHODS.CONNECTION]: console.log,
      [WS_MESSAGE_METHODS.DISCONNECTION]: console.log,
      [WS_MESSAGE_METHODS.MESSAGE]: (data) =>
        setMessages((prev) => [...prev, data]),
      [WS_MESSAGE_METHODS.TYPING_START]: (data) => {
        if (data.userId !== userId) {
          setTypingUser(data);
        }
      },
      [WS_MESSAGE_METHODS.TYPING_END]: () => setTypingUser(undefined),
      [WS_MESSAGE_METHODS.NONE]: console.log,
    });
    chatApi.unsubscribeClose(console.log);
    return () => chatApi.disconnect();
  }, []);

  useEffect(() => {
    if (text) {
      sendMessageHandler(WS_MESSAGE_METHODS.TYPING_START);
    } else {
      sendMessageHandler(WS_MESSAGE_METHODS.TYPING_END);
    }
  }, [text]);
  return (
    <>
      <Chat messages={messages} userId={userId} />
      <TypingLabel typingUser={typingUser} />
      <Form text={text} setText={setText} onSubmit={sendMessageHandler} />
    </>
  );
});
