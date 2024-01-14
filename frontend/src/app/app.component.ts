import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserService} from "./services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {FieldListComponent} from "./components/field-list/field-list.component";
import {FieldService} from "./services/field.service";

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [UserService,FieldService],
  imports: [CommonModule, RouterOutlet, UserListComponent, FieldListComponent, HttpClientModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
