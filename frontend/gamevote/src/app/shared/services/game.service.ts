import { Observable } from "rxjs";
import { Game } from "../types/game.type";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GameService{

    private readonly _backendURL: any = {};

    constructor(private readonly _httpClient: HttpClient) {
        // build backend base url
        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }

        // build all backend urls
        // @ts-ignore
        Object.keys(environment.backend.endpoints).forEach(
        (k) =>
            // @ts-ignore
            this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`
        );
    }

    allGames(): Observable<Game[]> {
        return this._httpClient.get<Game[]>(this._backendURL.allGames) as Observable<Game[]>;
    }

    oneGame(id: number): Observable<Game> {
        return this._httpClient.get<Game>(this._backendURL.oneGame.replace(':id', id.toString())) as Observable<Game>;
    }
    
}