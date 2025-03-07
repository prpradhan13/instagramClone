import React from 'react'
import { ChannelList } from 'stream-chat-expo'
import { router } from 'expo-router';
import useAuthStore from '@/src/stores/authStore';

const ChannelIndex = () => {
  const { user } = useAuthStore();

  return (
    <ChannelList
      filters={{ members: {$in: [user?.id!]} }} 
      onSelect={(channel) => router.push(`/channels/${channel.cid}`)} 
    />
  )
}

export default ChannelIndex;