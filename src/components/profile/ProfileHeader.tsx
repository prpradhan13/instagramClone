import { View, Text, ActivityIndicator, Pressable } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import useAuthStore from "@/src/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { UserDetailsType } from "@/src/types/auth.type";
import CircleLoading from "../loaders/CircleLoading";
import { cld } from "@/src/utils/lib/cloudinary";
import Feather from "@expo/vector-icons/Feather";
import { AdvancedImage } from "cloudinary-react-native";
import {
  useFollowerCount,
  useFollowingCount,
} from "@/src/utils/query/followerQuery";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

interface ProfileHeaderProps {
  userPostLength: number;
  select: "post" | "tag";
  setSelect: Dispatch<SetStateAction<"post" | "tag">>;
}

const ProfileHeader = ({ userPostLength, select, setSelect }: ProfileHeaderProps) => {
  const { user, logout } = useAuthStore();
  const userId = user?.id;

  const { data, isLoading } = useQuery<UserDetailsType>({
    queryKey: ["userDetails", userId],
  });
  const { data: followersCount, isFetching } = useFollowerCount(userId!);
  const { data: followingCount, isFetching: followingCountFetching } =
    useFollowingCount(userId!);

  if (isLoading) return <CircleLoading />;
  if (!data) return <Text>User not found</Text>;

  const userProfileImage = data.avatar_url && cld.image(data.avatar_url);

  return (
    <View>
      {/* First Part */}
      <View className="p-4">
        <View className="flex-row justify-between mt-2">
          <Text onPress={logout} className="text-white">LogOut</Text>
          <Text className="text-white font-medium text-lg">
            {data.user_name}
          </Text>
          <Feather name="menu" size={24} color="#fff" />
        </View>

        {/* Profile Image and Followers */}
        <View className="w-full flex-row items-center justify-between mt-2">
          <View>
            {userProfileImage ? (
              <AdvancedImage
                cldImg={userProfileImage}
                style={{
                  width: 96,
                  height: 96,
                  alignSelf: "center",
                  borderRadius: 100,
                }}
              />
            ) : (
              <View className="h-24 w-24 rounded-full bg-slate-600"></View>
            )}
          </View>
          <View className="w-[70%] flex-row justify-around">
            <View>
              <Text className="text-white text-lg font-semibold text-center">
                {userPostLength}
              </Text>
              <Text className="text-white">Post</Text>
            </View>

            <View>
              {isFetching ? (
                <ActivityIndicator size={"small"} color={"#fff"} />
              ) : (
                <Text className="text-white text-lg font-semibold text-center">
                  {followersCount?.count}
                </Text>
              )}
              <Text className="text-white">Followeers</Text>
            </View>

            <View>
              {followingCountFetching ? (
                <ActivityIndicator size={"small"} color={"#fff"} />
              ) : (
                <Text className="text-white text-lg font-semibold text-center">
                  {followingCount?.count}
                </Text>
              )}
              <Text className="text-white">Followeers</Text>
            </View>
          </View>
        </View>

        <View className="mt-2">
          <Text className="text-white font-medium text-lg capitalize">
            {data.full_name}
          </Text>
          {data.bio && (
            <Text className="text-white">
              {data.bio}
            </Text>
          )}
        </View>

        <Pressable className="bg-black border border-[#5a5a5a] my-6 rounded-lg py-1">
          <Text className="text-lg font-medium text-white text-center">
            Edit Profile
          </Text>
        </Pressable>

        {/* Highlights */}
        <View>
          <View className="justify-center items-center h-20 w-20 border border-[#5a5a5a] rounded-full">
            <Feather name="plus" size={32} color="#fff" />
          </View>
        </View>
      </View>

      {/* Second Part */}
      <View className="flex-row mt-4 items-center border-t-[0.5px] border-[#5a5a5a]">
        <MaterialIcons
          onPress={() => setSelect("post")}
          name="grid-on"
          size={30}
          color={`${select === "post" ? "#fff" : "#ababab"}`}
          className={`w-1/2 text-center border-b-2 py-2 ${
            select === "post" ? "border-white" : "border-transparent"
          }`}
        />
        <FontAwesome6
          onPress={() => setSelect("tag")}
          name="user-tag"
          size={28}
          color={`${select === "tag" ? "#fff" : "#ababab"}`}
          className={`w-1/2 text-center border-b-2 py-2 ${
            select === "tag" ? "border-white" : "border-transparent"
          }`}
        />
      </View>
    </View>
  );
};

export default ProfileHeader;
