import { Listing, User, Reservation } from "@prisma/client";
export type SafeListings = Omit<
    Listing,
    "createdAt" | "updatedAt" | "locationValue" | "userId"
> & {   
    createdAt: string;
    locationValue: string;
}
export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
    > & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListings;
    }
export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified" 
    > & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};
