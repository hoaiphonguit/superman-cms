export interface IResponse {
    success?: boolean;
    message?: string;
}

export interface IResponseList<T> extends IResponse {
    list?: T[];
}
