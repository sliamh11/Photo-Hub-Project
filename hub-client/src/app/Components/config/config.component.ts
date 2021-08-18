import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigModel } from 'src/app/Models/ConfigModel';
import { View } from 'src/app/Models/View';
import { ConfigService } from 'src/app/Services/config/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  viewsList: View[];
  selectedView: any;
  albumName: string;
  hide: boolean = true;
  allowPrivateMode: boolean = false;
  allowLocation: boolean = false;
  allowCamera: boolean = false;
  privatePassword: string;

  constructor(private service: ConfigService, private router: Router, private snackBar: MatSnackBar) {
    this.albumName = null;
  }

  // Make it that way that the first value will be the default value (and show it).
  ngOnInit(): void {
    this.loadViewsList();
  }

  async loadViewsList() {
    this.viewsList = await this.service.getViewsList();
    this.selectedView = this.viewsList[0];
  }

  handleViewSelected(id) {
    this.selectedView = this.viewsList[id];
  }

  async handleClickNext() {
    try {
      let configuration = new ConfigModel(this.selectedView, this.albumName, this.allowPrivateMode, this.allowLocation, this.allowCamera, this.privatePassword);
      if (await this.service.postConfiguration(configuration)) {
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
