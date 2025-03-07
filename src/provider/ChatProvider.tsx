import React, { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useGetUserDetatils } from "../utils/query/userQuery";
import { getCloudinaryUrl } from "../utils/lib/cloudinary";
import { Redirect, router } from "expo-router";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!);

const ChatProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);
  const { data } = useGetUserDetatils();

  useEffect(() => {
    const connect = async () => {
      if (!data) {
        return <Redirect href={"/(auth)/login"} />;
      }

      try {
        // Generate Cloudinary image URL from publicId
        const userImage = data.avatar_url
          ? getCloudinaryUrl(data.avatar_url)
          : "https://i.imgur.com/fR9Jz14.png";

        await client.connectUser(
          {
            id: data.id,
            name: data.user_name,
            image: userImage,
          },
          client.devToken(data.id)
        );

        setIsReady(true);
      } catch (error) {
        console.error("Error connecting to Stream:", error);
      }
    };

    connect();

    return () => {
      if (isReady) {
        client.disconnectUser();
      }
      setIsReady(false);
    };
  }, [data?.id]);

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;
