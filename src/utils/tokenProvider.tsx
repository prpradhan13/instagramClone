import { supabase } from "./supabase";

export const tokenProvider = async () => {
    const { data, error } = await supabase.functions.invoke('stream-token');
    if (error) throw new Error(error);
    
    return data.token;
}