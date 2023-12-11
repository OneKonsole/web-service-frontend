const PREFIX = 'http://auth.onekonsole.emetral.fr/users/';

export enum AUTH_API_ROUTES {
    LOGOUT = PREFIX + 'logout',
    GET_USER_INFO = PREFIX + 'babababa',
    LOGIN = PREFIX + 'login',
    REGISTER_USER = PREFIX + 'register',
    REFRESH_TOKEN = PREFIX + 'refresh',
    UPDATE_USER_INFO = PREFIX
}