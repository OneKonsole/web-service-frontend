import {UserInfo} from "@/type.ts";

/**
 * Return the user info
 */
export const getUserInfo = (): UserInfo | undefined => {

    // TODO : get the user info from the backend

    const userInfo: UserInfo = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@oneKonsole.fr",
        phone: "06 12 34 56 78",
        company: "OneKonsole",
        address: {
            name: "John Doe",
            street: "1, rue de la Paix",
            zipCode: "75000",
            city: "Paris",
            country: "France",
        }
    }

    return userInfo;
}