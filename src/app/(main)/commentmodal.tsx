import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useCreateComment, useGetCmtForPost } from "@/src/utils/query/cmtQuery";
import useCommentStore from "@/src/stores/commentStore";
import { buildCommentTree } from "@/src/utils/helperFunctions";
import Comment from "@/src/components/home/Comment";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { useOtherUserDetatils } from "@/src/utils/query/userQuery";

const Commentmodal = () => {
  const [replyText, setReplyText] = useState("");
  const {
    postId,
    replyToComment,
    setReplyToComment,
    commentUserId,
    setCommentUserId,
  } = useCommentStore();
  const { data, isFetching } = useGetCmtForPost(postId!);
  const queryClient = useQueryClient();
  const { data: replyToUserData } = useOtherUserDetatils(commentUserId!);

  useEffect(() => {
    return () => {
      setReplyToComment(null);
      setCommentUserId(null);
    };
  }, []);

  const commentTree = data ? buildCommentTree(data) : [];
  const { mutate } = useCreateComment();

  const handleBackBtn = () => {
    router.back();
  };

  const handleCmntPost = () => {
    if (!replyText) return alert("Please enter a reply text");

    mutate(
      { cmtText: replyText },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["comment", postId],
          });
          setReplyToComment(null);
          setCommentUserId(null);
          setReplyText("");
          router.back();
        },
      }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#2b2b2b]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, padding: 16 }}
      >
        <Ionicons
          onPress={handleBackBtn}
          name="arrow-back-outline"
          size={24}
          color="#fff"
          className="absolute top-4 left-4 z-50"
        />
        <Text className="text-center font-semibold text-white text-lg">
          Comments
        </Text>

        <ScrollView
          className="mt-5"
          contentContainerStyle={{ paddingBottom: 80 }}
          keyboardShouldPersistTaps="handled"
        >
          {commentTree.map((cmt) => (
            <Comment key={cmt.id} comment={cmt} />
          ))}
        </ScrollView>

        <View className="border border-white rounded-lg px-2">
          {commentUserId && (
            <Text className="text-white">@{replyToUserData?.user_name}</Text>
          )}
          <View className="flex-row items-center justify-between">
            <TextInput
              value={replyText}
              onChangeText={setReplyText}
              className="text-[#fff] w-[80%]"
              placeholder="Write a comment..."
              placeholderTextColor="#9d9d9d"
            />
            <Pressable onPress={handleCmntPost}>
              <Text className="text-blue-500 text-lg font-medium">Post</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Commentmodal;
