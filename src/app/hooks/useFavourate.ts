import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModel from "./useLoginModel";


interface IUseFavourate {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavourate = ({
    listingId,
    currentUser,
}:IUseFavourate) => {
    const router = useRouter();
    const loginModel = useLoginModel();
    const hasFavourated = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavourate = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) =>  {
        e.stopPropagation();
        if (!currentUser) {
            loginModel.onOpen();
        } 
        try {
            let request;
            if (hasFavourated) {
                request = ()=> axios.delete(`/api/favourites/${listingId}`); 
            } else {
                request = ()=> axios.post(`/api/favourites/${listingId}`);
            }
            await request();
            router.refresh();
            toast.success("Favourated");
        } catch (error) {
            toast.error("Something went wrong");
        }
    }, [currentUser, hasFavourated, listingId, loginModel, router]);
    return {
        hasFavourated,
        toggleFavourate,
    }
}
export default useFavourate;