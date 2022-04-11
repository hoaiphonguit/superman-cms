export interface INavigator {
    name: string;
    order?: number;
    url?: string;
    icon?: string;
    children?: INavigator[];
}
