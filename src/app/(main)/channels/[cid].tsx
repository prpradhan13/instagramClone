import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Channel as ChannelType } from "stream-chat";
import { Channel, MessageInput, MessageList, useChatContext } from 'stream-chat-expo'
import { SafeAreaView } from "react-native-safe-area-context";

const cid = () => {
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const { cid } = useLocalSearchParams<{ cid: string }>();

  const { client } = useChatContext();

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ cid })
      setChannel(channels[0]);
    }

    fetchChannel();
  }, [cid]);

  if (!channel) {
    return (
      <View className="flex-1 bg-[#121212] justify-center items-center">
        <ActivityIndicator size={"large"} color={"#fff"} />
      </View>
    );
  }

  return (
    <Channel channel={channel} audioRecordingEnabled>
      <MessageList />
      <SafeAreaView edges={['bottom']}>
        <MessageInput />
      </SafeAreaView>
    </Channel>
  );
};

export default cid;
