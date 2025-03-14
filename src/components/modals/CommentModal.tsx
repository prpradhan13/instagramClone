import { View, Text, Modal, TextInput } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGetCmtForPost } from "@/src/utils/query/cmtQuery";
import { buildCommentTree } from "@/src/utils/helperFunctions";
import Comment from "../home/Comment";

interface CommentModalProps {
  cmtModalOpen: boolean;
  setCmtModalOpen: Dispatch<SetStateAction<boolean>>;
  postId: string;
}

const CommentModal = ({
  cmtModalOpen,
  setCmtModalOpen,
  postId,
}: CommentModalProps) => {
  const { data, isFetching } = useGetCmtForPost(postId);
  const commentTree = data ? buildCommentTree(data) : [];

  const handleBackBtn = () => {
    setCmtModalOpen(false);
  };

  return (
    <Modal visible={cmtModalOpen} transparent animationType="slide" onRequestClose={handleBackBtn}>
      <View className="flex-1 bg-[#4b4b4b] p-4 rounded-t-3xl relative">
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

        <View>
          {commentTree.map((cmt) => (
            <Comment key={cmt.id} comment={cmt} />
          ))}
        </View>

        <View>
          <TextInput className="border border-white rounded-lg p-1 text-white" />
        </View>
      </View>
    </Modal>
  );
};

export default CommentModal;
