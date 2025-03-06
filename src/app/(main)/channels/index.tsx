import React from 'react'
import { ChannelList } from 'stream-chat-expo'
import { router } from 'expo-router';

const ChannelIndex = () => {

  return (
    <ChannelList onSelect={(channel) => router.push(`/channels/${channel.cid}`)} />
  )
}

export default ChannelIndex;