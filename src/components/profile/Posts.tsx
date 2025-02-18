import { View, Text, Image } from "react-native";
import React from "react";
import { useGetUserAllPosts } from "@/src/utils/query/postsQuery";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "@/src/utils/lib/cloudinary";

const Posts = () => {
  const { data } = useGetUserAllPosts();

  return (
    <View className="flex-row flex-wrap">
      {data && data.map((post, index) => {
        const postImage = cld.image(post.content_urls[0]);

        return(
          <View key={index} style={{ width: "33.33%", padding: 1 }} className="relative">
            {post.content_urls.length > 1 && (
              <View className="absolute bg-[#363636] right-2 top-2 z-10 px-1 rounded-full">
                <Text className="text-white text-sm">1/{post.content_urls.length}</Text>
              </View>
            )}
            <AdvancedImage cldImg={postImage} style={{ width: "100%", height: 130 }} />
          </View>
        )
      })}
    </View>
  );
};

export default Posts;
