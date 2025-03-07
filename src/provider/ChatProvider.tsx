import React, { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useGetUserDetatils } from "../utils/query/userQuery";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!);

const ChatProvider = ({ children }: PropsWithChildren) => {
    const [isReady, setIsReady] = useState(false);
    const { data } = useGetUserDetatils();

  useEffect(() => {
    if (!data) {
        return;
    }

    const connect = async () => {
      await client.connectUser(
        {
          id: data.id,
          name: data?.user_name,
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        client.devToken(data.id)
      );

      setIsReady(true);

      // const channel = client.channel("messaging", "the_park", {
      //   name: "The Park",
      // });

      // await channel.watch();
    };

    connect();

    return () => {
        if (isReady) {
            client.disconnectUser();
        }
        setIsReady(false);
    }
  }, [data?.id]);

  if(!isReady) {
    return (
        <View className="flex-1 bg-[#121212] justify-center items-center">
            <ActivityIndicator size={'large'} color={'#fff'} />
        </View>
    )
  }

  return (
      <OverlayProvider>
        <Chat client={client}>{children}</Chat>
      </OverlayProvider>
  );
};

export default ChatProvider;
