export interface Auth {
    user?:  User;
    token?: string;
    msg?: string;
}

export interface User {
    name:  string;
    email: string;
    login: string;
    role:  string;
    state: boolean;
    uid:   string;
}
