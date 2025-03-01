import { FlatList, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Posts from "@/src/components/profile/Posts";
import TagPosts from "@/src/components/profile/TagPosts";
import ProfileHeader from "@/src/components/profile/ProfileHeader";
import { useGetUserAllPosts } from "@/src/utils/query/postsQuery";
import { chunkArray } from "@/src/utils/helperFunctions";

const ProfileScreen = () => {
  const [select, setSelect] = useState<"post" | "tag">("post");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data: userPost, isFetching, refetch } = useGetUserAllPosts();

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  const groupedPosts = userPost ? chunkArray(userPost, 3) : [];

  return (
    <SafeAreaView className="bg-[#121212] flex-1">
      <FlatList
        data={select === "post" ? groupedPosts : []}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <ProfileHeader
            userPostLength={userPost?.length || 0}
            select={select}
            setSelect={setSelect}
          />
        }
        renderItem={({ item }) =>
          select === "post" ? (
            <Posts postItems={item} />
          ) : (
            <TagPosts />
          )
        }
        ListEmptyComponent={() => <Text className="text-white">No posts</Text>}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
