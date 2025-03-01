import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { useCreatePost } from "@/src/utils/query/postsQuery";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/src/stores/authStore";
import { PostsType } from "@/src/types/post.type";
import { router } from "expo-router";

const PostScreen = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [captionForPost, setCaptionForPost] = useState("");
  const [location, setLocation] = useState("");

  const { user } = useAuthStore();
  const userId = user?.id;
  const queryClient = useQueryClient();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const { mutate, isPending } = useCreatePost();

  const postData = {
    file: selectedImage,
    captionForPost: captionForPost,
    location,
  };

  const handleCancelPost = () => {
    setSelectedImage("");
    setCaptionForPost("");
    setLocation("");
  };

  const handlePostSubmit = async () => {
    mutate(
      { postData },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(
            ["getAllPosts", userId],
            (oldData: PostsType[] | undefined) => {
              if (!oldData) {
                return data;
              }

              return [...oldData, data];
            }
          );

          queryClient.invalidateQueries({ queryKey: ["getAllPublicPosts"] });
          handleCancelPost();
          router.navigate("/(main)/(tabs)")
        },
        onError: () => {
          Toast.show({
            type: "error",
            text1: "Failed to post",
          });

          handleCancelPost();
        },
      }
    );
  };

  return (
    <SafeAreaView className="bg-[#121212] flex-1">
      {!selectedImage ? (
        <View className="flex-1 flex-row gap-2 items-center justify-center">
          <AntDesign name="plus" size={22} color="#fff" />
          <Pressable onPress={pickImage} className="">
            <Text className="text-white font-medium text-xl">New post</Text>
          </Pressable>
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-row justify-between items-center px-4 mt-4">
              <Text
                onPress={handleCancelPost}
                disabled={isPending}
                className={`text-white text-lg ${
                  isPending ? "opacity-70" : ""
                }`}
              >
                Cancel
              </Text>
              <Text
                onPress={handlePostSubmit}
                disabled={isPending}
                className={`text-blue-500 font-medium text-lg ${
                  isPending ? "opacity-70" : ""
                }`}
              >
                Post
              </Text>
            </View>

            {isPending ? (
              <View className="bg-[#000000ab] flex-1 w-full items-center justify-center z-20">
                <Text className="text-white text-lg">Posting...</Text>
              </View>
            ) : (
              <View>
                <Image
                  source={{ uri: selectedImage }}
                  className="w-full h-[50vh] mt-2"
                />
                <View className="p-4">
                  <Text className="text-white text-lg mt-2">Caption</Text>
                  <TextInput
                    value={captionForPost}
                    onChangeText={setCaptionForPost}
                    placeholder="Write a caption..."
                    placeholderTextColor="#8d8d8d"
                    className="text-white text-lg p-2 border-b border-[#8d8d8d] w-full"
                  />
                </View>
                <View className="p-4">
                  <Text className="text-white text-lg mt-2">Location</Text>
                  <TextInput
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Write a location..."
                    placeholderTextColor="#8d8d8d"
                    className="text-white text-lg p-2 border-b border-[#8d8d8d] w-full"
                  />
                </View>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default PostScreen;
