export interface IUser {
    login: string
}
export interface IRocket {
    id: number;
    title: string,
    rocketName: string,
    username:string,
    description:string
}
export interface ServerResponse {
    total_count: number;
    incomplete_results: boolean;
    items: IUser[]
}