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
          headerTitle: "Messages",
        }}
      />
      <Stack.Screen
        name="[cid]"
        options={{
          headerShown: true,
          headerTitle: "Chats",
        }}
      />
    </Stack>
  );
};

export default ChannelsLayout;
