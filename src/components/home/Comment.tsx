import { View, Text, Pressable } from "react-native";
import React from "react";
import {
  BuildCommentTreeType,
} from "@/src/types/cmtAndLike.type";
import {
  useOtherUserDetatils,
} from "@/src/utils/query/userQuery";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "@/src/utils/lib/cloudinary";
import useCommentStore from "@/src/stores/commentStore";

const Comment = ({
  comment,
  parentUserId = null,
  isReply = false,
}: {
  comment: BuildCommentTreeType;
  parentUserId?: string | null;
  isReply?: boolean;
}) => {
  const { data: user } = useOtherUserDetatils(comment.user_id);
  const { data: parentUser } = useOtherUserDetatils(parentUserId || "");
  const { setReplyToComment, setCommentUserId } = useCommentStore();

  const handleReplyPress = () => {
    setReplyToComment(comment.id);
    setCommentUserId(comment.user_id);
  };

  // Fetch parent user's details if parentUserId is provided

  if (!user) return null;

  const userProfileImage = user.avatar_url && cld.image(user.avatar_url);

  return (
    <View className={`${isReply ? "ml-6 py-3" : ""}`}>
      {/* User Avatar */}
      <View className="flex flex-row gap-2 items-center mb-1">
        {userProfileImage ? (
          <AdvancedImage
            cldImg={userProfileImage}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <View className="w-8 h-8 bg-gray-400 rounded-full flex justify-center items-center font-medium bg-gradient-to-t from-[#1d1d1d] via-[#353535] to-[#898989] text-sm">
            <Text className="text-sm text-white">US</Text>
          </View>
        )}
        <Text className="font-semibold text-white">
          {user?.user_name || "Anonymous"}
        </Text>
        {parentUserId && parentUser && (
          <Text className="text-gray-400 text-sm">
            Replying to {" "}
            <Text className="text-[#fff]">
              @{parentUser?.user_name || "Unknown"}
            </Text>
          </Text>
        )}
      </View>

      <Text className="font-semibold mt-1 text-white">{comment.text}</Text>

      <Pressable onPress={handleReplyPress}>
        <Text className="text-[#959595]">Reply</Text>
      </Pressable>

      {comment.replies.length > 0 && (
        <View className="mt-2">
          {comment.replies.map((reply, index) => (
            <Comment
              key={`index_${index}_${reply.id}`}
              comment={reply}
              parentUserId={comment.user_id}
              isReply={true}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default Comment;
