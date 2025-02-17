import React from 'react'
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/src/context/AuthProvider';
import useAuthStore from '@/src/stores/authStore';

const MainLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
    </Stack>
  )
}

export default MainLayout;