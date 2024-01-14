import {Component, Inject, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {PaymentService} from "../../services/payment.service";
import {SnackbarService} from "../../services/snackbar.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Payment} from "../../interfaces/payment";
import {Field} from "../../common/field";
import {MatSlideToggleChange, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-field-payments',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSlideToggleModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './field-payments.component.html',
})
export class FieldPaymentsComponent implements OnInit {
  payments: Payment[] = [];
  displayedColumns: string[] = ['year', 'price', 'paid', 'dateTime'];

  constructor(
    private service: PaymentService,
    private snackBarService: SnackbarService,
    private dialogRef: MatDialogRef<FieldPaymentsComponent>,
    @Inject(MAT_DIALOG_DATA) public field: Field,
  ) {
  }

  ngOnInit(): void {
    this.fetchPayments();
  }

  private fetchPayments() {
    this.service.getAllPaymentsByFieldId(this.field.id!).subscribe({
      next: value => {
        this.payments = value;
      }
    })
  }

  setPaid(paymentId: bigint, event: MatSlideToggleChange) {
    this.service.setPaymentPaid(paymentId, event.checked).subscribe({
      next: value => {
        this.fetchPayments();
        this.snackBarService.open('Payment updated successfully');
      },
    });
  }

  closeModal() {
    this.dialogRef.close(false);
  }
}
