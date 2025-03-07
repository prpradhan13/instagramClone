import { Pressable, Text, View } from "react-native";
import React from "react";
import { useOtherUserDetatils } from "@/src/utils/query/userQuery";
import { cld } from "@/src/utils/lib/cloudinary";
import { AdvancedImage } from "cloudinary-react-native";
import { useChatContext } from "stream-chat-expo";
import useAuthStore from "@/src/stores/authStore";
import { router } from "expo-router";

const UsersList = ({ item }: { item: string }) => {
  const { data: followerData, isLoading } = useOtherUserDetatils(item);
  const { client } = useChatContext();
  const { user: loggedinUser } = useAuthStore();

  if (!followerData) {
    return;
  }

  const userAvatar =
    followerData.avatar_url && cld.image(followerData.avatar_url);

  const handlePress = async () => {
    if (!loggedinUser) {
      return null;
    }

    try {
      const channel = client.channel("messaging", {
        members: [loggedinUser.id, item],
      });

      await channel.watch();

      router.replace(`/(main)/channels/${channel.cid}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable onPress={handlePress} className="flex-row items-center gap-3">
      {userAvatar ? (
        <AdvancedImage
          cldImg={userAvatar}
          style={{
            width: 60,
            height: 60,
            alignSelf: "center",
            borderRadius: 100,
          }}
        />
      ) : (
        <View className="h-[60px] w-[60px] rounded-full bg-slate-600"></View>
      )}
      <Text className="text-xl text-white font-medium">
        {followerData?.user_name}
      </Text>
    </Pressable>
  );
};

export default UsersList;
