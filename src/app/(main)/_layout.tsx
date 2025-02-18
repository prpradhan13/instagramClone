import React from 'react'
import { Redirect, Stack } from 'expo-router';
import useAuthStore from '@/src/stores/authStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

const MainLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryClientProvider>
  )
}

export default MainLayout;