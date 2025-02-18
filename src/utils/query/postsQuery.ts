import useAuthStore from "@/src/stores/authStore"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "../supabase";
import Toast from "react-native-toast-message";
import { PostsType } from "@/src/types/post.type";


export const useGetUserAllPosts = () => {
    const { user } = useAuthStore();
    const userId = user?.id;
    
    return useQuery<PostsType[]>({
        queryKey: ['getAllPosts', userId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('user_id', userId)

            if (error) {
                Toast.show({
                    type: "error",
                    text1: "Failed to fetch posts",
                });
                return [];
            }

            return data;
        },
        enabled: !!userId,
    })
}