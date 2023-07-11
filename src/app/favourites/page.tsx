import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavouritesClient from "./FavouritesClient";
const ListingPage = async () => {
    const currentUser = await getCurrentUser();
    const listings = await getFavoriteListings();
    if(listings.length===0){
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks likes you have no favorites listings yet"
                />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <FavouritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ListingPage;