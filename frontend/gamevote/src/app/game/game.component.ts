import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Game } from '../shared/types/game.type';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../shared/services/game.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { NgFor } from '@angular/common';

@Component({
  selector: 'nwt-game',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatListModule, NgFor],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{

  private _game: Game | null;

  constructor(private _route: ActivatedRoute, private _gameService: GameService) {
    this._game = null;
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      let id = params.get('id');
      if(id){
        this._gameService.oneGame(parseInt(id)).subscribe(game => {
          this._game = game;
        })
      }
    })
  }

  get game (): Game | null {
    if(this._game && typeof this._game.first_release_date === 'number') this._game.first_release_date = new Date(this._game.first_release_date * 1000).toLocaleDateString('fr-FR');
    return this._game;
  }
}
