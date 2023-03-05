export interface IAuth {
    loading?: boolean;
    isAuthenticated: boolean;
    user: IUser;
}

export interface IUser {
    _id: string;
    username: string;
    name: string;
    phone?: string;
    createdAt?: number;
    lastModified?: number;
    avatar?: string;
    baned?: number;
}

export interface ILogin {
    username: string;
    password: string;
    remember?: boolean;
}
