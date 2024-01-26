export interface Person{
    name: string;
    favourites: Favorite[]
}

export interface Favorite{
    id: number,
    name: string
}
