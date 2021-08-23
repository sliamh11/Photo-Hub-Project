import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigModel } from 'src/app/Models/ConfigModel';
import { IView } from 'src/app/Models/IView';
import { ConfigService } from 'src/app/Services/config/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {

  viewsList: IView[];
  selectedView: IView;
  albumName: string;
  hide: boolean = true;
  allowPrivateMode: boolean = false;
  allowLocation: boolean = false;
  allowCamera: boolean = false;
  privatePassword: string;

  constructor(private configService: ConfigService, private router: Router, private snackBar: MatSnackBar) {
    this.albumName = null;
    this.viewsList = [];
    this.loadViewsList();
  }

  loadViewsList = async () => {
    this.viewsList = await this.configService.getViews();
    this.selectedView = this.viewsList[0]; // Default selection 
  }

  handleViewSelected = (view: IView) => {
    this.selectedView = view;
  }

  handleClickNext = async () => {
    try {
      const configuration = new ConfigModel(this.selectedView, this.albumName, this.allowPrivateMode, this.allowLocation, this.allowCamera, this.privatePassword);
      if (await this.configService.postConfiguration(configuration)) {
        this.router.navigate(["upload-image"]);
      }
      else {
        this.snackBar.open("An error has occured.", "Ok");
      }
    } catch (error) {
      this.snackBar.open(`${error.message}`, "Ok");
    }
  }
}
