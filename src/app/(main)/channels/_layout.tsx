import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ChannelsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTitle: "Chats",
          headerTintColor: "#ffffff",
        }}
      />
      <Stack.Screen
        name="[cid]"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#121212",
          },
        //   headerTitle: "Chats",
          headerTintColor: "#ffffff",
        }}
      />
    </Stack>
  );
};

export default ChannelsLayout;
