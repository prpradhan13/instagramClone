import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { UserDetailsType } from "@/src/types/auth.type";
import useAuthStore from "@/src/stores/authStore";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "@/src/utils/lib/cloudinary";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGetStory } from "@/src/utils/query/storyQuery";
import { router } from "expo-router";
import { StoryType } from "@/src/types/story.type";

const Story = () => {
  const { user } = useAuthStore();
  const userId = user?.id;

  const { data } = useQuery<UserDetailsType>({
    queryKey: ["userDetails", userId],
  });

  const { data: storyData } = useGetStory();

  const pressStory = (storyUserId: string) => {
    router.push(`/viewStory/${storyUserId}`);
  };

  if (!data) return <Text>User not found</Text>;

  const userProfileImage = data.avatar_url && cld.image(data.avatar_url);

  const uniqueUsersWithStories = React.useMemo(() => {
    return storyData?.reduce((acc: StoryType[], item) => {
      const isStoryExpiry = new Date(item.expires_at).getTime() > Date.now();

      if (isStoryExpiry && !acc.some((story) => story.user_id === item.user_id)) {
        acc.push(item);
      }

      return acc;
    }, []);
  }, [storyData]);

  return (
    <View className="flex-row items-center px-4 mt-2">
      <View className="border-r border-[#484848] pr-2">
        {userProfileImage ? (
          <AdvancedImage
            cldImg={userProfileImage}
            style={{
              width: 60,
              height: 60,
              alignSelf: "center",
              borderRadius: 100,
              position: "relative",
            }}
          />
        ) : (
          <View className="h-24 w-24 rounded-full bg-slate-600"></View>
        )}
        <View className="bg-blue-500 rounded-full p-1 absolute bottom-0 right-2">
          <AntDesign name="plus" size={18} color="#fff" />
        </View>
      </View>

      {uniqueUsersWithStories && uniqueUsersWithStories.length > 0 && (
        <FlatList
          data={uniqueUsersWithStories}
          keyExtractor={(data) => data.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingStart: 16,
            gap: 14,
          }}
          renderItem={({ item }) => {
            const storyUserImage =
              item.user.avatar_url && cld.image(item.user.avatar_url);

            return (
              <Pressable
                onPress={() => pressStory(item.user_id)}
                className="border-white border-[2px] p-1 rounded-full"
              >
                {storyUserImage ? (
                  <AdvancedImage
                    cldImg={storyUserImage}
                    style={{
                      width: 60,
                      height: 60,
                      alignSelf: "center",
                      borderRadius: 100,
                      position: "relative",
                    }}
                  />
                ) : (
                  <View className="h-24 w-24 rounded-full bg-slate-600"></View>
                )}
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
};

export default Story;
