import { View, Text, FlatList, Dimensions } from "react-native";
import React, { useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import useAuthStore from "@/src/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { PostsType } from "@/src/types/post.type";
import PostDetailsCard from "@/src/components/home/PostDetailsCard";
import { SafeAreaView } from "react-native-safe-area-context";

const screenHeight = Dimensions.get("window").height;

const FullScreenPostView = () => {
  const { indexNumber } = useLocalSearchParams();
  const { user } = useAuthStore();
  const userId = user?.id;

  const { data: posts } = useQuery<PostsType[]>({
    queryKey: ["getAllPosts", userId],
  });

  const flatListRef = useRef<FlatList>(null);

  if (!posts) return null;

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <FlatList
        ref={flatListRef}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: screenHeight,
          offset: screenHeight * index,
          index,
        })}
        initialScrollIndex={Number(indexNumber)}
        onScrollToIndexFailed={() => {
          flatListRef.current?.scrollToIndex({ index: 0, animated: true });
        }}
        renderItem={({ item }) => <PostDetailsCard postId={item.id} />}
      />
    </SafeAreaView>
  );
};

export default FullScreenPostView;
