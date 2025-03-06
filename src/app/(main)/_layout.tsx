import React, { useEffect } from "react";
import { Redirect, Stack } from "expo-router";
import useAuthStore from "@/src/stores/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetUserDetatils } from "@/src/utils/query/userQuery";
import CircleLoading from "@/src/components/loaders/CircleLoading";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";

const queryClient = new QueryClient();
const client = StreamChat.getInstance("22rhx3vamtmv");

const Layout = () => {
  const { isAuthenticated } = useAuthStore();
  const { isLoading } = useGetUserDetatils();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  if (isLoading) return <CircleLoading />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="fullScreenPostView/[indexNumber]" />
      <Stack.Screen name="viewStory/[storyUserId]" />
      <Stack.Screen name="channels" />
    </Stack>
  );
};

const MainLayout = () => {
  useEffect(() => {
    const connect = async () => {
      await client.connectUser(
        {
          id: "jlahey",
          name: "Jim Lahey",
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        client.devToken("jlahey")
      );

      // const channel = client.channel("messaging", "the_park", {
      //   name: "The Park",
      // });

      // await channel.watch();
    };

    connect();
  });

  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <Chat client={client}>
          <Layout />
        </Chat>
      </OverlayProvider>
    </QueryClientProvider>
  );
};

export default MainLayout;
