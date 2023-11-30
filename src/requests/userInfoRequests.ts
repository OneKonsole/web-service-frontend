import {UserInfo} from "@/type.ts";


let mockUserInfo: UserInfo = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@oneKonsole.fr",
    phone: "06 12 34 56 78",
    company: "OneKonsole",
};


export const getUserInfo = (): UserInfo | undefined => {

    // TODO : get the user info from the backend

    return mockUserInfo;
}

export const updateUserInfo = (newUserInfo: UserInfo): boolean => {

    // TODO : update the user info in the backend

    if (newUserInfo) {
        mockUserInfo = newUserInfo;
        return true;
    } else {
        return false;
    }
}

