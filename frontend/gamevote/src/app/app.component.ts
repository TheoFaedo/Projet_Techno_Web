import { ApplicationModule, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GamesComponent } from "./games/games.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GamesComponent, HttpClientModule, AppComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gamevote';
}
