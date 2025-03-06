import { View, Text, Dimensions, Pressable, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AdvancedImage } from "cloudinary-react-native";
import { useGetStoryByUserId } from "@/src/utils/query/storyQuery";
import { cld } from "@/src/utils/lib/cloudinary";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width, height } = Dimensions.get("window");
const STORY_DURATION = 10000;

const ViewStory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { storyUserId } = useLocalSearchParams();
  const singleStoryUserId = Array.isArray(storyUserId)
    ? storyUserId[0]
    : storyUserId;

  const { data, isLoading } = useGetStoryByUserId(singleStoryUserId || "");

  const progress = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCloseStory = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    router.back();
  };

  const handleNextStory = () => {
    if (timerRef.current) clearTimeout(timerRef.current); // Clear old timer

    if (images.length > 0 && currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleCloseStory();
    }
  };

  const startProgress = () => {
    progress.setValue(0); // Reset animation

    // Animate progress to full duration
    Animated.timing(progress, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    }).start();

    // Set timer to switch stories
    timerRef.current = setTimeout(handleNextStory, STORY_DURATION);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      startProgress();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current); // Cleanup on unmount
    };
  }, [currentIndex, data]);

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

  const images = data?.map((story) => cld.image(story.content_url)) ?? [];
  const storyUserImage =
    data?.map((story) => cld.image(story.user.avatar_url)) ?? [];
  const storyUserName =
    data?.map((story) => story.user.user_name);

  return (
    <SafeAreaView className="bg-[#121212] flex-1 relative">
      {/* Progress Bar */}
      <View className="flex-row gap-1 px-2 z-50">
        {images.map((_, index) => (
          <View
            key={index}
            className="flex-1 h-1 mt-5 bg-gray-600 rounded-lg overflow-hidden"
          >
            <Animated.View
              style={{
                width:
                  index === currentIndex
                    ? progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0%", "100%"],
                      })
                    : index < currentIndex
                    ? "100%"
                    : "0%",
                height: "100%",
                backgroundColor: "white",
              }}
            />
          </View>
        ))}
      </View>

      <View className="z-50 flex-row justify-between items-center p-2 ">
        <View className="flex-row gap-2 items-center">
          {storyUserImage ? (
            <AdvancedImage
              cldImg={storyUserImage[currentIndex]}
              style={{
                width: 40,
                height: 40,
                alignSelf: "center",
                borderRadius: 100,
              }}
            />
          ) : (
            <View className="h-24 w-24 rounded-full bg-slate-600"></View>
          )}
          <Text className="text-white font-medium">{storyUserName && storyUserName[currentIndex]}</Text>
        </View>
        <AntDesign
          name="close"
          size={24}
          color="#fff"
          onPress={handleCloseStory}
        />
      </View>

      {/* Story Viewer */}
      <Pressable
        className="flex-1 justify-center items-center"
        onPress={handleNextStory}
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
