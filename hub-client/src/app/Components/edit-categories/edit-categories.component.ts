import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory } from 'src/app/Models/ICategory';
import { ConfigService } from 'src/app/Services/config/config.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css']
})
export class EditCategoriesComponent {
  @ViewChild('categoryName') public categoryRef: ElementRef;
  categoriesList: ICategory[];

  constructor(private configService: ConfigService, private snackBar: MatSnackBar) {
    this.initCategories();
  }

  initCategories = async () => {
    this.categoriesList = await this.configService.getCategories();
  }

  handleRemoveCategory = async (category: ICategory) => {
    try {
      const index = this.categoriesList.indexOf(category);
      this.categoriesList.splice(index, 1);
      await this.configService.postCategories(this.categoriesList);
    } catch (error) {
      this.snackBar.open(error.message, "Ok");
    }
  }

  handleAddCategory = async (category: string) => {
    try {
      this.categoriesList.push({
        id: this.categoriesList.length,
        name: category
      });
      await this.configService.postCategories(this.categoriesList);
      this.categoryRef.nativeElement.value = '';
    } catch (error) {
      this.snackBar.open(error.message, "Ok");
    }
  }
}
