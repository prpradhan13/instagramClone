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
};

export const useGetAllPublicPost = () => {
    return useQuery<PostsType[] | undefined>({
        queryKey: ['getAllPublicPosts'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('visibility', 'public');
            
            if (error) {
                Toast.show({
                    type: "error",
                    text1: "Failed to fetch public posts",
                })
                return undefined;
            };

            return data;
        }
    });
}

export const useGetPostDetails = (postId: string) => {
    return useQuery<PostsType | undefined>({
        queryKey: ['getPostDetails', postId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*, user_id(id, user_name, avatar_url)')
                .eq('id', postId)
                .single()

            if (error) {
                Toast.show({
                    type: "error",
                    text1: "Failed to fetch post details",
                })
                return undefined;
            }

            return data;
        },
        enabled:!!postId,
    })
}