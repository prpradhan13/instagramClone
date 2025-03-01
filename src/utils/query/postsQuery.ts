import useAuthStore from "@/src/stores/authStore"
import { useMutation, useQuery } from "@tanstack/react-query"
import { supabase } from "../supabase";
import Toast from "react-native-toast-message";
import { CreatePostType, PostsType } from "@/src/types/post.type";
import { uploadCloudinary } from "../lib/cloudinary";

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
                .order('created_at', { ascending: false });

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
                .eq('visibility', 'public')
                .order('created_at', { ascending: false });
            
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
};

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
};

export const useCreatePost = () => {
    const { user } = useAuthStore();
    const userId = user?.id;

    return useMutation({
        mutationFn: async ({ postData }: {postData: CreatePostType}) => {
            const { file, captionForPost, location } = postData;

            const cldResponse: any = await uploadCloudinary(file);
            const publicId = await cldResponse.public_id;

            if (!publicId) {
                throw new Error("Failed to upload image");
            };

            const content_type = cldResponse.resource_type;

            const { data, error } = await supabase
                .from('posts')
                .insert({
                    user_id: userId,
                    content_type,
                    content_urls: [publicId],
                    caption: captionForPost,
                    location,
                })
                .select("*");
            
            if (error) {
                throw new Error("Failed to create post");
            }

            return data;
        }
    })
};