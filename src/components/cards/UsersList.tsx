import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useOtherUserDetatils } from "@/src/utils/query/userQuery";
import { cld } from "@/src/utils/lib/cloudinary";
import { AdvancedImage } from "cloudinary-react-native";

const UsersList = ({ item }: { item: string }) => {
  const { data: followerData, isLoading } = useOtherUserDetatils(item);

  
  if (!followerData) {
      return null;
  }
  
  const userAvatar =
    followerData.avatar_url && cld.image(followerData.avatar_url);

  return (
    <View className="flex-row items-center gap-3">
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
      <Text className="text-xl text-white font-medium">{followerData?.user_name}</Text>
    </View>
  );
};

export default UsersList;
