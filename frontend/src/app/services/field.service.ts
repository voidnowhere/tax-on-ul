import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Field} from "../common/field";
import {FieldRequest} from "../common/field-request";
import {env} from "../env";

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  private apiUrl = `${env.baseUrl}/fields`;

  constructor(private http: HttpClient) {
  }

  getFieldById(userId: number): Observable<Field> {
    const url = `${this.apiUrl}/${userId}`;  // Replace with your actual API endpoint
    return this.http.get<Field>(url);
  }

  getAllFields(ownerId: number): Observable<Field[]> {
    const url = `${this.apiUrl}/by_owner/${ownerId}`;  // Replace with your actual API endpoint
    return this.http.get<Field[]>(url);
  }

  deleteField(fieldId: number | undefined): Observable<Object> {
    const url = `${this.apiUrl}/${fieldId}`;  // Replace with your actual API endpoint
    return this.http.delete<Field>(url);
  }

  updateField(field: Field): Observable<Field> {
    const url = `${this.apiUrl}/${field.id}`;  // Replace with your actual API endpoint
    return this.http.patch<Field>(url, {
      surface: field.surface,
      categoryId: field.categoryId,
      year: field.year,
    });
  }

  createField(field: FieldRequest): Observable<FieldRequest> {
    const url = `${this.apiUrl}`;  // Replace with your actual API endpoint
    return this.http.post<FieldRequest>(url, field);
  }
}
