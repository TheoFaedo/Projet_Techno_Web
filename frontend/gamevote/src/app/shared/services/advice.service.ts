import { catchError, Observable, tap, throwError } from "rxjs";
import { Advice } from "../types/advice.type"; 
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AdviceService {
    private readonly BASE_URL = 'http://localhost:3000/advices'; 

    constructor(private readonly _httpClient: HttpClient) {}

    getComments(gameId: number): Observable<Advice[]> {
        const url = `${this.BASE_URL}/game/${gameId}`;
        return this._httpClient.get<Advice[]>(url);
    }

    addComment(gameId: number, advice: Partial<Advice>): Observable<Advice> {
        const url = `${this.BASE_URL}/${gameId}/add`;
        return this._httpClient.post<Advice>(url, advice).pipe(
            tap((response) => console.log('Comment added:', response)),
            catchError((error) => {
                console.error('Error adding comment:', error);
                return throwError(error);
            })
        );
    }
}