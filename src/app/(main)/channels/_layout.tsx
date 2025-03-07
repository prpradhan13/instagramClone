import React from "react";
import { Stack } from "expo-router";

const ChannelsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#121212",
        },
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Chats",
        }}
      />
      <Stack.Screen
        name="[cid]"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default ChannelsLayout;
