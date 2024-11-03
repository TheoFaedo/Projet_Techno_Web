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

export type Game = {
    id: number;
    igbdId: number;
    name: string;
    first_release_date: number;
    platforms: Platform[];
    genres: Genre[];
    game_modes: Gamemode[];
    websites: Website[];
    cover: string;
    rating: number;
    summary: string;
    steam_price: number;
}