import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {Owner} from "../../common/owner";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-add-user-modal-component',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule
  ],
  templateUrl: './add-user-modal-component.component.html',
})
export class AddUserModalComponent {
  newUser: Owner = {
    nic: '',
  };
  isUpdateMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    // Check if data is provided for updating
    if (this.data && this.data.user) {
      this.isUpdateMode = true;
      this.newUser = { ...this.data.user }; // Make a copy to avoid modifying the original data
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddUser(): void {
    this.dialogRef.close(this.newUser);
  }
}
