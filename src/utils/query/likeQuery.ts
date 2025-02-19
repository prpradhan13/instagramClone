import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import Toast from "react-native-toast-message";

export const useCountLikes = (postId: string) => {
  return useQuery<{ count: number; userIds: string[] } | undefined>({
    queryKey: ["countLikes", postId],
    queryFn: async () => {
      const { data, count, error } = await supabase
        .from("likes")
        .select("user_id", { count: "exact" })
        .eq("post_id", postId);

      if (error) {
        Toast.show({
          type: "error",
          text1: "Failed to fetch like count",
        });
        return undefined;
      }

      const userIds = data ? data.map((like) => like.user_id) : [];

      return { count: count ?? 0, userIds };
    },
    enabled: !!postId,
  });
};
