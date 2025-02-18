import { View, ActivityIndicator } from 'react-native'
import React from 'react'

const CircleLoading = () => {
  return (
    <View className='flex-1 bg-black justify-center items-center'>
      <ActivityIndicator size={"large"} color={"#fff"} />
    </View>
  )
}

export default CircleLoading