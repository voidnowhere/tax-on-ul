import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../common/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8082/api/owners';

  constructor(private http: HttpClient) {
  }

  getUserById(userId: number): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;  // Replace with your actual API endpoint
    return this.http.get<User>(url);
  }

  getAllUsers(): Observable<User[]> {
    const url = `${this.apiUrl}`;  // Replace with your actual API endpoint
    console.log(this.http.get<User[]>(url))
    return this.http.get<User[]>(url);
  }

  deleteUser(userId: number | undefined): Observable<Object> {
    const url = `${this.apiUrl}/${userId}`;  // Replace with your actual API endpoint
    return this.http.delete<User>(url);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user.id}`;  // Replace with your actual API endpoint
    return this.http.patch<User>(url, user);
  }

  createUser(user: User): Observable<User> {
    const url = `${this.apiUrl}`;  // Replace with your actual API endpoint
    return this.http.post<User>(url, user);
  }
}
