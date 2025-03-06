import useAuthStore from "@/src/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import Toast from "react-native-toast-message";
import { UserDetailsType } from "@/src/types/auth.type";

export const useGetUserDetatils = () => {
  const { user } = useAuthStore();
  const userId = user?.id;

  return useQuery<UserDetailsType[]>({
    queryKey: ["userDetails", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        Toast.show({
          type: "error",
          text1: "Failed to fetch user details",
        });
        return {};
      }

      return data;
    },
    enabled: !!userId,
  });
};

export const useOtherUserDetatils = (userId: string) => {
  return useQuery<UserDetailsType[]>({
    queryKey: ["userDetails", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        Toast.show({
          type: "error",
          text1: "Failed to fetch other user details",
        });
        return {};
      }

      return data;
    },
    enabled: !!userId,
  });
};
