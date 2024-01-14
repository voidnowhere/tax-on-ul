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
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {FieldRequest} from "../../common/field-request";
import {CategoryService} from "../../services/category.service";

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
})
export class AddFieldModalComponent implements OnInit {
  newField: FieldRequest = {
    surface: 0,
    categoryId: 0,
    ownerId: 0,
    year: 0,
  };
  isUpdateMode: boolean = false;
  categories: any[] = [];
  owners: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddFieldModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
  ) {
  }


  ngOnInit() {
    // Check if data is provided for updating
    this.isUpdateMode = this.data.categoryId > 0;
    this.newField = {...this.data}; // Make a copy to avoid modifying the original data

    // Fetch categories from the API
    this.categoryService.getAllCategories().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error fetching categories:', error);
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
