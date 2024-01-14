import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../services/snackbar.service";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: SnackbarService
  ) {
  }

  submit(): void {
    if (this.form.valid) {
      this.authService.login({
        email: this.form.value.email,
        password: this.form.value.password,
      }).subscribe({
        next: (value: any) => {
          this.form.reset();
          this.authService.setLoggedIn(value.token)
          this.router.navigate(['fields']);
        },
        error: err => {
          this.snackBar.open('Invalid email or password');
          this.password.reset();
        }
      });
    }
  }

  get email() {
    return this.form.get("email")!;
  }

  get password() {
    return this.form.get("password")!;
  }
}
