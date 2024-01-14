import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CategoryService} from "../../services/category.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './category-add.component.html',
})
export class CategoryAddComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  constructor(
    private dialogRef: MatDialogRef<CategoryAddComponent>,
    private service: CategoryService,
    private snackBarService: SnackbarService
  ) {
  }

  submit() {
    if (this.form.valid) {
      this.service.addCategory({
        'name': this.form.value.name,
        'price': this.form.value.price,
      }).subscribe({
        next: value => {
          this.snackBarService.open('Category added successfully!');
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
