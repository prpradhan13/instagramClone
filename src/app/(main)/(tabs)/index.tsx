import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import CircleLoading from "@/src/components/loaders/CircleLoading";
import PostDetailsCard from "@/src/components/home/PostDetailsCard";
import { useGetAllPublicPost } from "@/src/utils/query/postsQuery";
import Story from "@/src/components/home/Story";
import { router } from "expo-router";

const index = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data, isFetching, refetch } = useGetAllPublicPost();

  const MemoizedStory = React.memo(Story);

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#121212] flex-1">
      <View className="p-4 flex-row items-center justify-between">
        <Feather name="camera" size={26} color="#fff" />
        <Text
          style={{ fontFamily: "Satisfy" }}
          className="text-white font-bold text-3xl"
        >
          Instagram
        </Text>
        <Feather onPress={() => router.push('/channels')} name="send" size={26} color="#fff" />
      </View>

      <View className="bg-black flex-1">
        {isFetching ? (
          <CircleLoading />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(data) => data.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 16,
            }}
            ListHeaderComponent={() => <MemoizedStory />}
            renderItem={({ item }) => (
              <PostDetailsCard key={item.id} postId={item.id} />
            )}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default index;
