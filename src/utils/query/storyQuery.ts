import useAuthStore from "@/src/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { StoryType } from "@/src/types/story.type";


export const useGetStory = () => {
    return useQuery<StoryType[]>({
        queryKey: ["story"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("stories")
                .select("*, user: user_id(user_name, avatar_url)")

            if (error) {
                throw new Error(error.message);
            }

            return data;
        }
    })
};

export const useGetStoryByUserId = (userId: string) => {
    return useQuery<StoryType[]>({
        queryKey: ["story", userId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("stories")
                .select("*, user: user_id(user_name, avatar_url)")
                .eq("user_id", userId)

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
        enabled: !!userId
    })
}