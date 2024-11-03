import { Component, OnInit } from '@angular/core';
import { Game } from '../shared/types/game.type';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nwt-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit {

  _games: Game[]; 

  private readonly _backendURL: any;

  constructor(private _httpClient: HttpClient) {
    this._backendURL = {};
    this._games = [];

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  allGames(): Observable<Game[]> {
    return this._httpClient.get<Game[]>(this._backendURL.allGames) as Observable<Game[]>;
  }

  ngOnInit(): void {
    this.allGames().subscribe(games => this._games = games);
  }
  
  get games(): Game[] {
    return this._games;
  }
}
