import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { supabase } from "../supabase"
import { CommentTypes } from "@/src/types/cmtAndLike.type"
import useAuthStore from "@/src/stores/authStore"
import useCommentStore from "@/src/stores/commentStore"


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

export const useCreateComment = () => {
    const { user } = useAuthStore();
    const { postId, replyToComment } = useCommentStore();

    let parentCmtId: string | null;
    if (replyToComment) {
      parentCmtId = replyToComment;
    } else {
      parentCmtId = null;
    }
  
    return useMutation({
      mutationFn: async ({ cmtText }: { cmtText: string }) => {
        if (!user?.id) {
          alert("User id missing!");
          return null;
        }
        
        const { error } = await supabase
          .from("comments")
          .insert({
            user_id: user.id,
            post_id: postId,
            parent_comment_id: parentCmtId,
            text: cmtText,
          })
  
        if (error) throw new Error(error.message);
      }
    })
  }