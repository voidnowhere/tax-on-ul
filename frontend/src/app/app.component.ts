import {Component, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {UserListComponent} from "./components/user-list/user-list.component";
import {HttpClientModule} from "@angular/common/http";
import {FieldListComponent} from "./components/field-list/field-list.component";
import {MatIconModule} from "@angular/material/icon";
import {AuthService} from "./services/auth.service";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserListComponent, FieldListComponent, HttpClientModule, RouterLink, RouterLinkActive, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private _loggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    effect(() => {
      this._loggedIn = authService.loggedIn();
    });
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
