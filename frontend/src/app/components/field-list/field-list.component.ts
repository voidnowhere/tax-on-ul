import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {User} from "../../common/user";
import {Field} from "../../common/field";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {FieldService} from "../../services/field.service";
import {AddFieldModalComponent} from "../add-field-modal-component/add-field-modal-component.component";
import {FieldRequest} from "../../common/field-request";

@Component({
  selector: 'app-field-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './field-list.component.html',
  styleUrl: './field-list.component.css'
})
export class FieldListComponent implements OnInit {
  fields: Field[] = [];
  newField: FieldRequest = {
    surface: 0,
    categoryId: 0,
    ownerId: 0,
  };


  displayedColumns: string[] = ['Id', 'Surface', 'Category', 'Owner', 'Actions']; // Add more columns if needed
  dataSource: MatTableDataSource<Field>;

  constructor(private fieldService: FieldService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<User>();
  }

  ngOnInit() {
    this.getFields();
    console.log(this.fields)
  }

  getFields() {
    this.fieldService.getAllFields().subscribe(
      data => {
        this.fields = data;
        this.dataSource.data = this.fields; // Set data for MatTableDataSource
      }
    );
  }

  deleteField(fieldId: number): void {
    this.fieldService.deleteField(fieldId).subscribe(
      () => {
        this.snackBar.open('Field deleted successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        // Reload fields after deletion
        this.getFields();
      },
      error => {
        console.error('Error deleting field:', error);
        this.snackBar.open('Error deleting field', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  editField(fieldId: number): void {

  }

  openAddFieldModal(): void {
    const dialogRef = this.dialog.open(AddFieldModalComponent, {
      width: '400px',
      data: {} // You can pass data to the modal if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Assuming the modal returns a new user object after successful addition
        this.newField = result;
        this.createUser();
      }
    });
  }

  createUser() {
    this.fieldService.createField(this.newField).subscribe(
      () => {
        this.snackBar.open('User created successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        // Reload users after creation
        this.getFields();
      },
      error => {
        console.error('Error creating user:', error);
        this.snackBar.open('Error creating user', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
