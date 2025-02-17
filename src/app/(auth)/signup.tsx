import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/ui/Button";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { validateSignUp } from "@/src/validations/register";
import { z } from "zod";
import { supabase } from "@/src/utils/supabase";
import Toast from "react-native-toast-message";

const signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignUp = async () => {
    setLoading(true);

    try {
      validateSignUp({ fullName, username, email, password });

      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_name: username,
          },
        },
      });
      
      if (error) {
        Toast.show({
          type: "error",
          text1: "Sign up Failed",
          text2: error.message,
        });
      } else if (!session) {
        Toast.show({
          type: "info",
          text1: "Please check your inbox for email verification!",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Sign up successful",
        });
      }
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: error.errors[0].message,
        });
      } else if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: "Unexpected error",
          text2:
            error.message || "An unexpected error occurred. Please try again.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "An unknown error occurred.",
        });
        console.log("Unknown error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-black w-full flex-1 justify-center p-4">
      <Text className="text-lightPrimaryTextColor text-[3rem] font-bold text-center">
        Instagram
      </Text>

      <View className="mt-8 gap-4">
        <TextInput
          placeholder="Full name"
          placeholderTextColor={"#fff"}
          value={fullName}
          onChangeText={(value) => setFullName(value)}
          className="bg-[#121212] text-lightPrimaryTextColor text-lg border border-white rounded-md p-4 w-full"
        />

        <TextInput
          placeholder="abcd_abcd"
          placeholderTextColor={"#fff"}
          value={username}
          onChangeText={(value) => setUsername(value)}
          className="bg-[#121212] text-lightPrimaryTextColor text-lg border border-white rounded-md p-4 w-full"
        />

        <TextInput
          placeholder="email@example.com"
          autoCapitalize="none"
          placeholderTextColor={"#fff"}
          value={email}
          onChangeText={(value) => setEmail(value)}
          className="bg-[#121212] text-lightPrimaryTextColor text-lg border border-white rounded-md p-4 w-full"
        />

        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor={"#fff"}
          value={password}
          onChangeText={(value) => setPassword(value)}
          className="bg-[#121212] text-lightPrimaryTextColor text-lg border border-white rounded-md p-4 w-full"
        />

        <Button onPress={handleSignUp} disabled={loading} className="py-3 mt-4">
          {loading ? (
            <ActivityIndicator size={20} color={"#fff"} />
          ) : (
            <Text className="font-semibold text-lightPrimaryTextColor">
              Sign up
            </Text>
          )}
        </Button>
      </View>

      <Pressable className="flex-row items-center mt-8" onPress={handleGoBack}>
        <Ionicons name="chevron-back" size={24} color="#fff" />
        <Text className="text-lightPrimaryTextColor text-lg font-semibold">
          {" "}
          Go Back
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default signup;
