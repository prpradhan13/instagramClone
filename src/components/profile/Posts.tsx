import { View, Text, Pressable } from "react-native";
import React from "react";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "@/src/utils/lib/cloudinary";
import { PostsType } from "@/src/types/post.type";
import { router } from "expo-router";

interface PostsProps {
  postItems: PostsType[];
}

const Posts = ({ postItems }: PostsProps) => {
  return (
    <View className="flex-row">
      {postItems.map((postItem, index) => (
        <Pressable
          key={index}
          onPress={() => router.push(`/fullScreenPostView/${index}`)}
          style={{ width: "33.33%", padding: 1 }}
        >
          {postItem.content_urls.length > 1 && (
            <View className="absolute bg-[#363636] right-2 top-2 z-10 px-1 rounded-full">
              <Text className="text-white text-sm">
                1/{postItem.content_urls.length}
              </Text>
            </View>
          )}
          <AdvancedImage
            cldImg={cld.image(postItem.content_urls[0])}
            style={{ width: "100%", height: 130 }}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default Posts;
