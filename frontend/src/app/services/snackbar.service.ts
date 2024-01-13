import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {
  }

  show(message: string) {
    this.snackBar.open('Category added successfully!', '', {
      duration: 3000,
    });
  }
}
