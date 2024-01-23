import {HttpMessage, TokenResponse} from "@/type.ts";
import {AUTH_API_ROUTES} from "@utils/routes/AUTH_API_ROUTES.ts";

type LogoutProps = {
    refreshToken: string,
    token: string
}
const logout = ({refreshToken, token}: LogoutProps) => {

    const body = {
        "refreshToken": refreshToken,
    }

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
        mode: 'cors'
    }

    return request(AUTH_API_ROUTES.LOGOUT, options)
        .then(data => {
            return data.data
        })
        .catch(err => {
            return {
                message: "Logout failed",
                code: 500,
                data: err
            } as HttpMessage
        })
}

type UserInfoProps = {
    token: string
}

const getUserInfo = async ({token}: UserInfoProps) => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    }

    return request(AUTH_API_ROUTES.GET_USER_INFO, options)
        .then(data => {
            return data
        })
        .catch(err => {
            const parseError = JSON.parse(err.message)
            if (parseError.code === 401) {
                // clear local storage
                localStorage.removeItem('authTokens');
                // redirect to login
                window.location.href = '/auth/login';
            }
            return {
                message: "Get user info failed",
                code: 500,
                data: err
            } as HttpMessage
        })
}

const updateUserInfo = async (token: string, data: never) => {

    const options = {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        mode: 'cors'
    }

    return request(AUTH_API_ROUTES.UPDATE_USER_INFO + data.id, options)
        .then(data => {
            return data
        })
        .catch(err => {
            const parseError = JSON.parse(err.message)
            if (parseError.code === 401) {
                // clear local storage
                localStorage.removeItem('authTokens');
                // redirect to login
                window.location.href = '/auth/login';
            }

            return {
                message: "Get user info failed",
                code: 500,
                data: err
            } as HttpMessage
        })
}

type TokenProps = {
    username: string,
    password: string
}

const login = async ({username, password}: TokenProps): Promise<HttpMessage> => {
    const body = {
        "username": username,
        "password": password
    }

    const formBody = Object.keys(body)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
        .join('&');

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
        mode: 'cors'
    }

    return request(AUTH_API_ROUTES.LOGIN, options)
        .then(data => {
            if (data.data.token === undefined || data.data.refreshToken === undefined || data.data.token === null || data.data.refreshToken === null) {
                return {
                    message: "Login failed",
                    code: 500,
                    data: data
                } as HttpMessage
            }

            return {
                message: "Login successful",
                code: 200,
                data: {
                    token: data.data.token,
                    refresh_token: data.data.refreshToken,
                } as TokenResponse
            } as HttpMessage
        })
        .catch(err => {
            console.log(err)
            return {
                message: "Login failed",
                code: 500,
                data: err
            } as HttpMessage
        })
}

type registerUserInfo = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    company: string,
    role: string,
    country: string,
    password: string
}

const register = async (data: registerUserInfo): Promise<HttpMessage> => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        mode: 'cors'
    }

    return request(AUTH_API_ROUTES.REGISTER_USER, options)
        .then(data => {
            return {
                message: "Register successful",
                code: 200,
                data: {
                    token: data.data.token,
                    refresh_token: data.data.refreshToken,
                } as TokenResponse
            } as HttpMessage
        })
        .catch(err => {
            return {
                message: "Get user info failed",
                code: 500,
                data: err
            } as HttpMessage
        })
}

type RefreshTokenProps = {
    refreshToken: string

}
const callRefreshToken = async ({refreshToken}: RefreshTokenProps): Promise<HttpMessage> => {
    const body = {
        "refreshToken": refreshToken,
    }

    const formBody = Object.keys(body)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
        .join('&');

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
        mode: 'cors'
    }

    return request(AUTH_API_ROUTES.REFRESH_TOKEN, options)
        .then(data => {
            if (data.data?.token === undefined || data.data?.refreshToken === undefined || data.data?.token === null || data.data?.refreshToken === null) {
                return {
                    message: "Refresh token failed",
                    code: 500,
                    data: data
                } as HttpMessage
            }
            return {
                message: "Refresh token successful",
                code: 200,
                data: {
                    token: data.data.token,
                    refresh_token: data.data.refreshToken,
                } as TokenResponse
            } as HttpMessage

        })
        .catch(err => {
            return {
                message: "Refresh token failed",
                code: 500,
                data: err
            } as HttpMessage
        })
}

const request = async (url, options) => {
    return fetch(url, options)
        .then(response => response.json())
        .then(data => {
            if (data.code < 200 || data.code > 299) {
                throw new Error(JSON.stringify({
                    message: data.message,
                    code: data.code
                }))
            }
            return data
        })
}

export {login, logout, getUserInfo, callRefreshToken, updateUserInfo, register}