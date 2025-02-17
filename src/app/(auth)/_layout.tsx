import { useAuth } from "@/src/context/AuthProvider";
import useAuthStore from "@/src/stores/authStore";
import { Redirect, Stack } from "expo-router";


const AuthLayout = () => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
      return <Redirect href="/(main)/(tabs)" />
    }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default AuthLayout;