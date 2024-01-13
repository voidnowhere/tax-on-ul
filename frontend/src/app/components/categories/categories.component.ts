import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Category} from "../../interfaces/category";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {CategoryAddComponent} from "../category-add/category-add.component";
import {CategoryEditComponent} from "../category-edit/category-edit.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns: string[] = ['name', 'price', 'control'];

  constructor(
    private service: CategoryService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.fetchAllCategories();
  }

  private fetchAllCategories() {
    this.service.getAllCategories().subscribe({
      next: value => {
        this.categories = value;
      }
    })
  }

  openAddModal() {
    this.dialog.open(CategoryAddComponent).afterClosed().subscribe({
      next: (value: boolean) => {
        if (value) {
          this.fetchAllCategories();
        }
      }
    });
  }

  openEditModal(category: Category) {
    this.dialog.open(CategoryEditComponent, {
      data: category,
    }).afterClosed().subscribe({
      next: (value: boolean) => {
        if (value) {
          this.fetchAllCategories();
        }
      }
    });
  }
}
