import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../common/user";
import {Field} from "../common/field";
import {FieldRequest} from "../common/field-request";

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  private apiUrl = 'http://localhost:8081/api/fields';

  constructor(private http: HttpClient) {
  }

  getFieldById(userId: number): Observable<Field> {
    const url = `${this.apiUrl}/${userId}`;  // Replace with your actual API endpoint
    return this.http.get<Field>(url);
  }

  getAllFields(): Observable<Field[]> {
    const url = `${this.apiUrl}`;  // Replace with your actual API endpoint
    console.log(this.http.get<Field[]>(url))
    return this.http.get<Field[]>(url);
  }

  deleteField(fieldId: number | undefined): Observable<Object> {
    const url = `${this.apiUrl}/${fieldId}`;  // Replace with your actual API endpoint
    return this.http.delete<Field>(url);
  }

  updateField(field: Field): Observable<Field> {
    const url = `${this.apiUrl}/${field.id}`;  // Replace with your actual API endpoint
    return this.http.patch<Field>(url, field);
  }

  createField(field: FieldRequest): Observable<FieldRequest> {
    const url = `${this.apiUrl}`;  // Replace with your actual API endpoint
    return this.http.post<FieldRequest>(url, field);
  }
}
