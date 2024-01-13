import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {env} from "../env";
import {Observable} from "rxjs";
import {Category} from "../interfaces/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly baseUrl: string = `${env.baseUrl}/categories`;

  constructor(private http: HttpClient) {
  }

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  public addCategory(category: Category): Observable<string> {
    return this.http.post<string>(this.baseUrl, {
      'name': category.name,
      'price': category.price,
    });
  }

  public editCategory(category: Category): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${category.id}`, {
      'name': category.name,
      'price': category.price,
    });
  }
}
