import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";



export function useAuth () {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getUser().then(
            ({data: {user}}) => {
                setUser(user);
                setIsLoading(false);
            });

    const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) =>{
        setUser(session?.user ?? null);
        setIsLoading(false);
    });


    return () => {
        subscription.unsubscribe();
    }

    }, []);

    return {
        user,
        isLoading,
        isAuthenticated: !!user
    };


};