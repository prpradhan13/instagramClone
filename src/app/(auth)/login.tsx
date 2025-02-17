import { View, Text, TextInput, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/src/components/ui/Button";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { supabase } from "@/src/utils/supabase";
import { validateLoginIn } from "@/src/validations/register";
import { z } from "zod";
import Toast from "react-native-toast-message";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogIn = async () => {
    setLoading(true);
    try {
      validateLoginIn({ email, password });

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: error.message,
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Login successful",
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
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-black w-full flex-1 justify-center items-center">
      <View className="w-full p-4">
        <Text className="text-lightPrimaryTextColor text-[3rem] font-bold text-center">
          Instagram
        </Text>

        <View className="mt-8 gap-4">
          <TextInput
            placeholder="Email"
            placeholderTextColor={"#fff"}
            value={email}
            onChangeText={(value) => setEmail(value)}
            autoCapitalize="none"
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

          <Text className="text-[#3797EF] font-semibold text-right">
            Forgot Password?
          </Text>

          <Button onPress={handleLogIn} disabled={loading} className="py-3 mt-4">
          {loading ? (
            <ActivityIndicator size={20} color={"#fff"} />
          ) : (
            <Text className="font-semibold text-lightPrimaryTextColor">
              Log in
            </Text>
          )}
        </Button>

          <Link href="/(auth)/signup" className="mt-4 text-center">
            <View className="flex-row items-center gap-2 justify-center">
              <FontAwesome name="facebook-square" size={24} color="#3797EF" />
              <Text className="text-[#3797EF] font-semibold text-lg">
                Log in with Facebook
              </Text>
            </View>
          </Link>
        </View>

        <Text className="text-lightPrimaryTextColor text-center mt-8 font-medium">
          Don't have an account?{" "}
          <Link href={"/(auth)/signup"}>
            <Text className="text-[#3797EF] "> Sign up. </Text>
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default login;
