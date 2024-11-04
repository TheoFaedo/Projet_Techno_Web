export type Platform = {
    name: string;
    id: number;
}

export type Genre = {
    name: string;
    id: number;
}

export type Gamemode ={
    id: number;
    name: string;
}

export type Website = {
    url: string;
    category: number;
}

export type Advise = {
    author: string;
    content: string;
    note: number;
}

export type Game = {
    id: number;
    igbdId: number;
    name: string;
    first_release_date: number | string;
    platforms: Platform[];
    genres: Genre[];
    game_modes: Gamemode[];
    websites: Website[];
    cover: {url: string};
    rating: number;
    summary: string;
    steam_price: number;
    advises?: Advise[];
}