import { Component, OnInit } from '@angular/core';
import { Game } from '../shared/types/game.type';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../shared/services/game.service';
import { AdviceService } from '../shared/services/advice.service';
import { CommonModule } from '@angular/common';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { Advice } from '../shared/types/advice.type';

@Component({
  selector: 'nwt-game',
  standalone: true,
  imports: [
    CommonModule,
    ReviewDialogComponent
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private _game: Game | null;
  showReviewDialog = false;
  advices: Advice[] = [];
  gameId: number | null = null;
  gameName : string | null = null;

  constructor(
    private _route: ActivatedRoute, 
    private _gameService: GameService,
    private _adviceService: AdviceService,
  ) {
    this._game = null;
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        this._gameService.oneGame(parseInt(id)).subscribe(game => {
          this._game = game;
          this.gameId = this._game.id;
          this.gameName = this._game.name;
          this._adviceService.getComments(parseInt(id)).subscribe(advices => {
            this.advices = advices;
          });
        });
      }
    });
  }

  get game(): Game | null {
    if (this._game && typeof this._game.first_release_date === 'number') {
      this._game.first_release_date = new Date(this._game.first_release_date * 1000).toLocaleDateString('fr-FR');
    }
    return this._game;
  }

  openReviewDialog(): void {
    this.showReviewDialog = true;
  }

  handleReviewSubmit(review: any): void {
    if (this._game) {
      if (!this._game.advises) {
        this._game.advises = [];
      }
      this._game.advises.push(review);
    }
    this.showReviewDialog = false;
  }

  closeReviewDialog(): void {
    this.showReviewDialog = false;
  }

  trackByMode(index: number, mode: any): string {
    return mode.name; 
}

trackByGenre(index: number, genre: any): string {
    return genre.name;
}

trackByPlatform(index: number, platform: any): string {
    return platform.name;
}

trackByAdvise(index: number, advise: Advice): string {
    return advise.author;
}
}
