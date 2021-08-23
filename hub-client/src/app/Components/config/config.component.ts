import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigModel } from 'src/app/Models/ConfigModel';
import { IView } from 'src/app/Models/IView';
import { ConfigService } from 'src/app/Services/config/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  viewsList: IView[];
  selectedView: any;
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

  // Make it that way that the first value will be the default value (and show it).
  ngOnInit(): void {
  }

  loadViewsList = async () => {
    this.viewsList = await this.configService.getViewsList();
    this.selectedView = this.viewsList[0];
  }

  handleViewSelected = (view: IView) => {
    this.selectedView = this.viewsList[view.id];
  }

  handleClickNext = async () => {
    try {
      let configuration = new ConfigModel(this.selectedView, this.albumName, this.allowPrivateMode, this.allowLocation, this.allowCamera, this.privatePassword);
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
