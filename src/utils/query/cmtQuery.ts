import { useQuery } from "@tanstack/react-query"
import { supabase } from "../supabase"
import { CommentTypes } from "@/src/types/cmtAndLike.type"


export const useGetCmtForPost = (postId: string) => {
    return useQuery<CommentTypes[]>({
        queryKey: ["comment", postId],
        queryFn: async () => {
            const { data, error } = await supabase.rpc('fetch_nested_comments', { postid: postId})

            if (error) throw new Error(error.message);
            
            return data;
        },
        enabled: !!postId
    })
} 