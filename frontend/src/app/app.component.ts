import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {UserListComponent} from "./components/user-list/user-list.component";
import {HttpClientModule} from "@angular/common/http";
import {FieldListComponent} from "./components/field-list/field-list.component";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserListComponent, FieldListComponent, HttpClientModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
