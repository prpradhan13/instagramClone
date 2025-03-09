import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import Toast from "react-native-toast-message";
import useAuthStore from "@/src/stores/authStore";

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

export const useLikeCreate = () => {
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async ({ postId, isLiked  }: { postId: string, isLiked?: boolean }) => {
      if (!user) return;

      if (isLiked) {
        // Unlike (delete the like)
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("user_id", user.id)
          .eq("post_id", postId);

        if (error) throw new Error("Failed to unlike the post");

        return { id: user.id, action: "unlike" };
      }

      const { data, error } = await supabase
        .from("likes")
        .insert({
          user_id: user.id,
          post_id: postId
        })
        .select("*")
        .single();

      if (error) throw new Error(error.message);

      return { id: user.id, action: "like" };
    }
  });
}
