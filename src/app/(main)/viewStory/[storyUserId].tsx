import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/src/stores/authStore";
import { AdvancedImage } from "cloudinary-react-native";
import { StoryType } from "@/src/types/story.type";
import { useGetStoryByUserId } from "@/src/utils/query/storyQuery";
import { cld } from "@/src/utils/lib/cloudinary";

const { width, height } = Dimensions.get("window");

const ViewStory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { storyUserId } = useLocalSearchParams();
  const singleStoryUserId = Array.isArray(storyUserId)
    ? storyUserId[0]
    : storyUserId;

  const { data, isLoading } = useGetStoryByUserId(singleStoryUserId);

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#121212] justify-center items-center">
        <Text className="text-white">Please Wait...</Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View className="flex-1 bg-[#121212] justify-center items-center">
        <Text className="text-white">No Stories Available</Text>
      </View>
    );
  }

  const images = data.map((story) => cld.image(story.content_url)) || [];

  const handleNextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.back(); // Go back if it's the last image
    }
  };

  return (
    <SafeAreaView className="bg-[#121212] flex-1">
      <Pressable
        className="flex-1 justify-center items-center"
        onPress={handleNextImage}
      >
        {images.length > 0 ? (
          <AdvancedImage
            cldImg={images[currentIndex]}
            style={{
              width,
              height,
            }}
          />
        ) : (
          <Text className="text-white">No Story Available</Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export default ViewStory;
