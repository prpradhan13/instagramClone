import { View, Text, Pressable } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import { useCountLikes } from "@/src/utils/query/likeQuery";
import useAuthStore from "@/src/stores/authStore";

const LikeCmt = ({ postId }: { postId: string }) => {
    const { user } = useAuthStore();
  const { data: likeCount, isFetching } = useCountLikes(postId);

  const userLiked = likeCount?.userIds.some((likeU) => likeU === user?.id);

  return (
    <View className="mt-4 px-4">
      <View className="flex-row gap-5 items-center">
        {userLiked ? (
            <FontAwesome name="heart" size={26} color="#ef4444" />
        ) : (
            <FontAwesome name="heart-o" size={26} color="#fff" />
        )}
        <FontAwesome5 name="comment" size={26} color="#fff" />
        <Feather name="send" size={26} color="#fff" />
      </View>

      {isFetching ? (
        <Text>Loading...</Text>
      ) : likeCount?.count === 0 ? "": (
        <Pressable className="mt-2">
          <Text className="text-white">
            Liked by{" "}
            <Text className="font-medium">{likeCount?.count}</Text>
            {" "}People
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default LikeCmt;
