import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import CircleLoading from "@/src/components/loaders/CircleLoading";
import PostDetailsCard from "@/src/components/home/PostDetailsCard";
import { useGetAllPublicPost } from "@/src/utils/query/postsQuery";

const index = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data, isFetching, refetch } = useGetAllPublicPost();

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
        <Feather name="send" size={26} color="#fff" />
      </View>

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
          renderItem={({ item }) => (
            <PostDetailsCard key={item.id} postId={item.id} />
          )}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      )}
    </SafeAreaView>
  );
};

export default index;
