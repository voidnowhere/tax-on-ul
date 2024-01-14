import {Component} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Field} from "../../common/field";
import {MatDialog} from "@angular/material/dialog";
import {FieldService} from "../../services/field.service";
import {AddFieldModalComponent} from "../add-field-modal-component/add-field-modal-component.component";
import {FieldRequest} from "../../common/field-request";
import {MatInputModule} from "@angular/material/input";
import {OwnerService} from "../../services/owner.service";
import {SnackbarService} from "../../services/snackbar.service";
import {FieldPaymentsComponent} from "../field-payments/field-payments.component";

@Component({
  selector: 'app-field-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './field-list.component.html',
})
export class FieldListComponent {
  fields: Field[] = [];
  newField: FieldRequest = {
    surface: 0,
    categoryId: 0,
    ownerId: 0,
  };
  ownerId: number = 0;
  displayedColumns: string[] = ['Surface', 'Category', 'Year', 'Actions']; // Add more columns if needed

  constructor(
    private fieldService: FieldService,
    private ownerService: OwnerService,
    private snackBar: SnackbarService,
    public dialog: MatDialog
  ) {
  }

  getFields() {
    this.fieldService.getAllFields(this.ownerId).subscribe(
      data => {
        this.fields = data;
      }
    );
  }

  deleteField(fieldId: number): void {
    this.fieldService.deleteField(fieldId).subscribe(
      () => {
        this.snackBar.open('Field deleted successfully');
        // Reload fields after deletion
        this.getFields();
      },
      error => {
        console.error('Error deleting field:', error);
        this.snackBar.open('Error deleting field');
      }
    );
  }

  editField(field: Field): void {
    const dialogRef = this.dialog.open(AddFieldModalComponent, {
      width: '400px',
      data: field
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fieldService.updateField(result).subscribe(
          () => {
            this.snackBar.open('Field edited successfully');
            // Reload users after creation
            this.getFields();
          },
        );
      }
    });
  }

  openAddFieldModal(): void {
    if (this.ownerId > 0) {
      const dialogRef = this.dialog.open(AddFieldModalComponent, {
        width: '400px',
        data: {
          ownerId: this.ownerId,
          categoryId: 0,
          surface: 0,
        } // You can pass data to the modal if needed
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Assuming the modal returns a new user object after successful addition
          this.newField = result;
          this.createField();
        }
      });
    }
  }

  createField() {
    this.fieldService.createField(this.newField).subscribe(
      () => {
        this.snackBar.open('Owner created successfully');
        // Reload users after creation
        this.getFields();
      },
      error => {
        console.error('Error creating user:', error);
        this.snackBar.open('Error creating owner');
      }
    );
  }

  fetchOwnerId(nic: string) {
    if (nic != '') {
      this.ownerService.getOwnerId(nic).subscribe({
        next: value => {
          this.ownerId = value;
          this.getFields();
        },
        error: err => {
          this.snackBar.open('Owner not found!');
        }
      });
    }
  }

  openFieldPaymentsModal(field: Field) {
    this.dialog.open(FieldPaymentsComponent, {
      data: field,
    });
  }
}
