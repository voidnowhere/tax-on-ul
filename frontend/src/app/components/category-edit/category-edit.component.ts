import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../services/category.service";
import {SnackbarService} from "../../services/snackbar.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {Category} from "../../interfaces/category";

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './category-edit.component.html',
})
export class CategoryEditComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  constructor(
    private dialogRef: MatDialogRef<CategoryEditComponent>,
    private service: CategoryService,
    private snackBarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public category: Category,
  ) {
    this.form.patchValue({
      'name': category.name,
      'price': category.price,
    });
  }

  submit() {
    if (this.form.valid) {
      this.service.editCategory({
        'id': this.category.id,
        'name': this.form.value.name,
        'price': this.form.value.price,
      }).subscribe({
        next: value => {
          this.snackBarService.open('Category edited successfully!');
          this.dialogRef.close(true);
        }
      })
    }
  }

  closeModal() {
    this.dialogRef.close(false);
  }

  get name() {
    return this.form.get('name')!;
  }

  get price() {
    return this.form.get('price')!;
  }
}
