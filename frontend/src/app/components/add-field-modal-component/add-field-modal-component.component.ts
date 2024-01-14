import {Component, Inject, OnInit} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {Field} from "../../common/field";
import {MatSelectModule} from "@angular/material/select";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {FieldRequest} from "../../common/field-request";

@Component({
  selector: 'app-add-field-modal-component',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatSelectModule, HttpClientModule, NgForOf
  ],
  templateUrl: './add-field-modal-component.component.html',
  styleUrl: './add-field-modal-component.component.css'
})
export class AddFieldModalComponent implements OnInit {
  newField: FieldRequest = {
    surface: 0,
    categoryId: 0,
    ownerId: 0,
  };
  isUpdateMode: boolean = false;
  categories: any[] = [];
  owners: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddFieldModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient // Inject HttpClient
  ) {
  }


  ngOnInit() {
    // Check if data is provided for updating
    if (this.data && this.data.field) {
      this.isUpdateMode = true;
      this.newField = {...this.data.field}; // Make a copy to avoid modifying the original data
    }

    // Fetch categories from the API
    this.http.get<any[]>('http://localhost:8081/api/categories').subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );

    // Fetch owners from the API
    this.http.get<any[]>('http://localhost:8082/api/owners').subscribe(
      (response) => {
        this.owners = response;
      },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddField(): void {
    this.dialogRef.close(this.newField);
  }

}
