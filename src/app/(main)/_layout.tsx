import React from "react";
import { Redirect, Stack } from "expo-router";
import useAuthStore from "@/src/stores/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetUserDetatils } from "@/src/utils/query/userQuery";
import CircleLoading from "@/src/components/loaders/CircleLoading";
import ChatProvider from "@/src/provider/ChatProvider";

const queryClient = new QueryClient();

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
      <Stack.Screen
        name="allFollowersList"
        options={{
          headerShown: true,
          headerTitle: "All Followers",
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTintColor: "#ffffff",
        }}
      />
    </Stack>
  );
};

const MainLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatProvider>
        <Layout />
      </ChatProvider>
    </QueryClientProvider>
  );
};

export default MainLayout;
