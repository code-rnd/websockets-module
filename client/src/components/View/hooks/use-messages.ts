import { useEffect, useLayoutEffect } from "react";
import { useQueryClient } from "react-query";

import { chatApi, WS_MESSAGE_METHODS } from "../../../api";
import { MessageModel } from "../../Chat";
import { rndHash } from "../../../shared";

export const useMessages = () => {
  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    const rnd = rndHash + "_salt";
    void queryClient.setQueriesData<string>("form/UserName", () => rnd);
    const user = {
      userId: rnd,
      user: rnd,
      messageId: (+new Date()).toString(16),
      method: WS_MESSAGE_METHODS.CONNECTION,
      date: new Date(),
    };
    chatApi.openChannel(user);
  }, []);

  useEffect(() => {
    chatApi.subscribeAllMessage<MessageModel>({
      [WS_MESSAGE_METHODS.CONNECTION]: (data) => {
        void queryClient.setQueriesData<MessageModel[]>(
          "pack/Message",
          (prev = []) => {
            return [...prev, { ...data, text: "Присоединился" }];
          }
        );
      },
      [WS_MESSAGE_METHODS.MESSAGE]: (data) => {
        void queryClient.setQueriesData<MessageModel[]>(
          "pack/Message",
          (prev = []) => {
            return [...prev, data];
          }
        );
      },
      [WS_MESSAGE_METHODS.TYPING_START]: (data) => {
        void queryClient.setQueriesData<MessageModel>("pack/TypingUser", data);
      },
      [WS_MESSAGE_METHODS.TYPING_END]: () => {
        void queryClient.setQueriesData("pack/TypingUser", undefined);
      },
      [WS_MESSAGE_METHODS.NONE]: console.log,
    });

    chatApi.unsubscribeClose(console.log);
    return () => chatApi.disconnect();
  }, []);
};
