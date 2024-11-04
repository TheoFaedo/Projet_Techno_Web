import { Routes } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    { path: '', redirectTo: 'games', pathMatch: 'full' },
    { path: 'games', component: GamesComponent },
    { path: 'game/:id', component: GameComponent }
];
