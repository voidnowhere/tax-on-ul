import {Component, OnInit} from '@angular/core';
import {Owner} from "../../common/owner";
import {OwnerService} from "../../services/owner.service";
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {AddUserModalComponent} from "../add-user-modal-component/add-user-modal-component.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class UserListComponent implements OnInit {
  users: Owner[] = [];
  newUser: Owner = {
    nic: '',
  };

  displayedColumns: string[] = ['id', 'nic', 'actions']; // Add more columns if needed
  dataSource: MatTableDataSource<Owner>;

  constructor(private userService: OwnerService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Owner>();
  }

  ngOnInit() {
    this.getUsers();
    console.log(this.users)
  }

  getUsers() {
    this.userService.getAllOwners().subscribe(
      data => {
        this.users = data;
        this.dataSource.data = this.users; // Set data for MatTableDataSource
      }
    );
  }

  createUser() {
    this.userService.createOwner(this.newUser).subscribe(
      () => {
        this.snackBar.open('User created successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        // Reload users after creation
        this.getUsers();
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


  editUser(userId: number): void {
    // Find the user by ID
    const userToEdit = this.users.find(user => user.id === userId);

    if (userToEdit) {
      // Open the update user modal with the user data
      const dialogRef = this.dialog.open(AddUserModalComponent, {
        width: '400px',
        data: {user: userToEdit}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.userService.updateOwner(result).subscribe(
            updatedUser => {
              const index = this.users.findIndex(user => user.id === updatedUser.id);
              if (index !== -1) {
                this.getUsers();
                this.snackBar.open('User updated successfully', 'Close', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                });
              } else {
                console.error(`User with ID ${updatedUser.id} not found in the array.`);
              }
            },
            error => {
              console.error('Error updating user:', error);
              this.snackBar.open('Error updating user', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });
            }
          );
        }
      });
    } else {
      console.error(`User with ID ${userId} not found.`);
    }
  }

  deleteUser(userId: number): void {
    this.userService.deleteOwner(userId).subscribe(
      () => {
        this.snackBar.open('User deleted successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        // Reload users after deletion
        this.getUsers();
      },
      error => {
        console.error('Error deleting user:', error);
        this.snackBar.open('Error deleting user', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  openAddUserModal(): void {
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      width: '400px',
      data: {} // You can pass data to the modal if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Assuming the modal returns a new user object after successful addition
        this.newUser = result;
        this.createUser();
      }
    });
  }

  openUpdateUserModal(user: Owner): void {
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      width: '400px',
      data: {user: user} // Pass the user data for updating
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Assuming the modal returns a user object after successful addition or update
        this.newUser = result;
        this.createUser();
      }
    });
  }
}
