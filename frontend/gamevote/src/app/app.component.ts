import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { GamesComponent } from "./games/games.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule, Location } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, GamesComponent, AppComponent, MatToolbarModule, CommonModule, MatIconModule, RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  constructor(private location: Location) { }


  goBack(): void {
    this.location.back();
  }
}
