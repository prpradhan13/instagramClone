import useAuthStore from "@/src/stores/authStore"
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import Toast from "react-native-toast-message";

export const useFollowerCount = (userId: string) => {
    return useQuery<{count: number; followerIds: string[]} | undefined>({
        queryKey: ['followerCount', userId],
        queryFn: async () => {
            const { data, count, error } = await supabase
                .from('followers')
                .select("follower_id", { count: "exact" })
                .eq("following_id", userId)
                // .order("created_at", { ascending: false });

            if (error) {
                Toast.show({
                    type: "error",
                    text1: "Failed to fetch follower count",
                })

                return undefined;
            };

            const followerIds = data.map(({ follower_id }) => follower_id);

            return { count: count ?? 0,  followerIds}
        },
        enabled:!!userId,
    })
}

export const useFollowingCount = (userId: string) => {
    return useQuery<{count: number; followingIds: string[]} | undefined>({
        queryKey: ['followingCount', userId],
        queryFn: async () => {
            const { data, count, error } = await supabase
                .from('followers')
                .select("following_id", { count: "exact" })
                .eq("follower_id", userId)

            if (error) {
                Toast.show({
                    type: "error",
                    text1: "Failed to fetch follower count",
                })

                return undefined;
            };

            const followingIds = data.map(({ following_id }) =>following_id);

            return { count: count ?? 0,  followingIds}
        },
        enabled:!!userId,
    })
}