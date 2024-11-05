import { Component, OnInit } from '@angular/core';
import { Game } from '../shared/types/game.type';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { GameService } from '../shared/services/game.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'nwt-games',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule, MatFormFieldModule, 
    MatSelectModule, MatInputModule, MatChipsModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit {

  private _games: Game[]; 
  private _sort: string | null;
  private _q: string | null;
  private _gameModes: string[];
  private _genres: string[];
  private _platforms: string[];

  constructor(private _gameService: GameService) {
    this._games = [];
    this._sort = null;
    this._q = null;
    this._gameModes = [];
    this._genres = [];
    this._platforms = [];
  }
  ngOnInit(): void {
    this._gameService.allGames([]).subscribe(games => this._games = games);
  }

  get games(): Game[] {
    return this._games;
  }

  get sort(): string | null {
    return this._sort;
  }

  handleSortChange(event: MatSelectChange) {
    this._sort = event.value;
  }

  handleGamemodesSelectionChange(event: MatSelectChange) {
    this._gameModes = event.value;
  }

  handleGenresSelectionChange(event: MatSelectChange) {
    this._genres = event.value;
  }

  handlePlatformsSelectionChange(event: MatSelectChange) {
    this._platforms = event.value;
  }

  handleSearchChange(event: Event) {
    this._q = (event.target as HTMLInputElement).value;
    console.log(this._q);
  }

  handleSearchRequest(event: MouseEvent) {
    const filters: string[] = [];
    if(this._sort) filters.push(this._gameService.sortStr(this._sort));
    if(this._q) filters.push(this._gameService.qStr(this._q));
    
    this._gameModes.forEach(gm => filters.push(this._gameService.filterStr("game_modes", gm)));
    this._genres.forEach(g => filters.push(this._gameService.filterStr("genres", g)));
    this._platforms.forEach(p => filters.push(this._gameService.filterStr("platforms", p)));

    this._gameService.allGames(filters).subscribe(games => this._games = games);
  }
}
