export interface LoginResponse {
    user:  User;
    token: string;
}

export interface UsersList {
    total: number;
    users: User[];
}

export interface User {
    name:  string;
    email: string;
    login: string;
    role:  string;
    state: boolean;
    uid:   string;
}
