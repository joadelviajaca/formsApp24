export interface LoginResponse {
    user:  User;
    token: string;
}

export interface User {
    name:  string;
    email: string;
    login: string;
    role:  string;
    state: boolean;
    uid:   string;
}
