import { Component, OnInit } from '@angular/core';
import { Game } from '../shared/types/game.type';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import { GameService } from '../shared/services/game.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nwt-games',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatChipsModule, RouterLink],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit {

  _games: Game[]; 

  constructor(private _gameService: GameService) {
    this._games = [];
  }
  ngOnInit(): void {
    this._gameService.allGames().subscribe(games => this._games = games);
  }

  get games(): Game[] {
    return this._games;
  }
}
