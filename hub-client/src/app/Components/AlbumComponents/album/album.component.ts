import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { View } from 'src/app/Models/View';
import { AlbumService } from 'src/app/Services/Album/album.service';
import { ConfigService } from 'src/app/Services/config/config.service';
import { PrivateModeDialogComponent } from '../../private-mode-dialog/private-mode-dialog.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {

  isPrivateMode: boolean;
  isFavoriteMode: boolean;
  viewsList: View[];

  constructor(private configService: ConfigService, private albumService: AlbumService, private dialog: MatDialog) {
    this.init();
    this.configService.onPrivateModeChanged.subscribe((isEnabled) => {
      this.isPrivateMode = isEnabled;
    });
  }

  init = async () => {
    this.isPrivateMode = this.configService.getPrivateMode();
    this.viewsList = await this.configService.getViewsList()
  }

  disablePrivateMode = () => {
    this.configService.setPrivateMode(false);
  }

  handleFavoriteClicked = () => {
    this.isFavoriteMode = !this.isFavoriteMode;
    this.albumService.onFavoriteModeChanged.emit(this.isFavoriteMode);
  }

  openPrivateModeDialog = () => {
    const dialogRef = this.dialog.open(PrivateModeDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.configService.setPrivateMode(result);
      }
    });
  }

  handleViewSelected = (view: View) => {
    this.albumService.onViewModeChanged.emit(view);
  }
}
