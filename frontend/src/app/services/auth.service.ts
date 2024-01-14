import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user";
import {env} from "../env";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl: string = `${env.baseUrl}/auth`;
  loggedIn: WritableSignal<boolean> = signal(false);
  private _token: string | null = null;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.loggedIn.set(token != null);
    this._token = token;
  }

  login(user: User) {
    return this.http.post(`${this._baseUrl}/login`, {
      'email': user.email,
      'password': user.password,
    });
  }

  logout() {
    this._token = null;
    localStorage.removeItem('token');
    this.loggedIn.set(false);
  }

  setLoggedIn(token: string) {
    this._token = token;
    localStorage.setItem('token', token);
    this.loggedIn.set(true);
  }


  get token(): string | null {
    return this._token;
  }
}
