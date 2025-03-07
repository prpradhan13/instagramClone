import React from "react";
import { ChannelList } from "stream-chat-expo";
import { router, Stack } from "expo-router";
import useAuthStore from "@/src/stores/authStore";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Pressable } from "react-native";

const ChannelIndex = () => {
  const { user } = useAuthStore();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={() => router.push('/(main)/allFollowersList')} hitSlop={100}>
              <FontAwesome5 name="users" size={24} color="#fff" style={{ marginHorizontal: 15 }} />
            </Pressable>
          ),
        }}
      />
      
      <ChannelList
        filters={{ members: { $in: [user?.id!] } }}
        onSelect={(channel) => router.push(`/channels/${channel.cid}`)}
      />
    </>
  );
};

export default ChannelIndex;
