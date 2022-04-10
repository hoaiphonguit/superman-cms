export interface IAuth {
    loading?: boolean;
    isAuthenticated: boolean;
    user: IUser;
}

export interface IUser {
    id: string;
    username: string;
    name: string;
}

export interface ILogin {
    username: string;
    password: string;
    remember?: boolean;
}
