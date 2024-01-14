import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Owner} from "../common/owner";
import {env} from "../env";

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private apiUrl = `${env.baseUrl}/owners`;

  constructor(private http: HttpClient) {
  }

  getUserById(userId: number): Observable<Owner> {
    const url = `${this.apiUrl}/${userId}`;  // Replace with your actual API endpoint
    return this.http.get<Owner>(url);
  }

  getAllOwners(): Observable<Owner[]> {
    const url = `${this.apiUrl}`;  // Replace with your actual API endpoint
    console.log(this.http.get<Owner[]>(url))
    return this.http.get<Owner[]>(url);
  }

  deleteOwner(userId: number | undefined): Observable<Object> {
    const url = `${this.apiUrl}/${userId}`;  // Replace with your actual API endpoint
    return this.http.delete<Owner>(url);
  }

  updateOwner(user: Owner): Observable<Owner> {
    const url = `${this.apiUrl}/${user.id}`;  // Replace with your actual API endpoint
    return this.http.patch<Owner>(url, user);
  }

  createOwner(user: Owner): Observable<Owner> {
    const url = `${this.apiUrl}`;  // Replace with your actual API endpoint
    return this.http.post<Owner>(url, user);
  }

  getOwnerId(nic: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/get_id/${nic}`);
  }
}
