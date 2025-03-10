import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import { useCountLikes, useLikeCreate } from "@/src/utils/query/likeQuery";
import useAuthStore from "@/src/stores/authStore";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import CommentModal from "../modals/CommentModal";

const LikeCmt = ({ postId }: { postId: string }) => {
  const [cmtModalOpen, setCmtModalOpen] = useState(false);
  const { user } = useAuthStore();
  const { data: likeCount, isFetching } = useCountLikes(postId);
  const { mutate } = useLikeCreate();
  const queryClient = useQueryClient();

  const userLiked = likeCount?.userIds.some((likeU) => likeU === user?.id);

  const onPressLike = () => {
    const hasLiked = likeCount?.userIds.includes(user?.id!);

    mutate(
      { postId, isLiked: hasLiked },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(
            ["countLikes", postId],
            (oldData: { count: number; userIds: string[] } | undefined) => {
              if (!oldData) {
                return {
                  count: 1,
                  userIds: [user?.id],
                };
              }

              return {
                ...oldData,
                count: hasLiked ? oldData.count - 1 : oldData.count + 1,
                userIds: hasLiked
                  ? oldData.userIds.filter((id) => id !== user?.id)
                  : [...oldData.userIds, user?.id],
              };
            }
          );
        },
        onError: () => {
          Toast.show({
            type: "error",
            text1: "Failed to Like this post",
          });
        },
      }
    );
  };

  return (
    <View className="mt-4 px-4">
      <View className="flex-row gap-5 items-center">
        {userLiked ? (
          <FontAwesome onPress={onPressLike} name="heart" size={26} color="#ef4444" />
        ) : (
          <FontAwesome
            onPress={onPressLike}
            name="heart-o"
            size={26}
            color="#fff"
          />
        )}
        <FontAwesome5 onPress={() => setCmtModalOpen(true)} name="comment" size={26} color="#fff" />
        <Feather name="send" size={26} color="#fff" />
      </View>

      {isFetching ? (
        <Text>Loading...</Text>
      ) : likeCount?.count === 0 ? (
        ""
      ) : (
        <Pressable className="mt-2">
          <Text className="text-white">
            Liked by <Text className="font-medium">{likeCount?.count}</Text>{" "}
            People
          </Text>
        </Pressable>
      )}

      {cmtModalOpen && (
        <CommentModal 
          cmtModalOpen={cmtModalOpen}
          setCmtModalOpen={setCmtModalOpen}
          postId={postId}
        />
      )}
    </View>
  );
};

export default LikeCmt;
