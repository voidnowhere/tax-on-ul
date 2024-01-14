import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Payment} from "../interfaces/payment";
import {env} from "../env";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = `${env.baseUrl}/payments`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllPaymentsByFieldId(fieldId: bigint): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/by_field/${fieldId}`);
  }

  setPaymentPaid(paymentId: bigint, value: boolean): Observable<string> {
    return this.http.patch<string>(`${this.baseUrl}/${paymentId}`, value);
  }
}
