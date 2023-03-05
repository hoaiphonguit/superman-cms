export interface INavigator {
    _id: string;
    name: string;
    order?: number;
    url?: string;
    icon?: string;
    children?: INavigator[];
    defaultExpand?: boolean;
}
