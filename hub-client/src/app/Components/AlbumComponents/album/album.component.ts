import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IView } from 'src/app/Models/IView';
import { AlbumService } from 'src/app/Services/Album/album.service';
import { ConfigService } from 'src/app/Services/config/config.service';
import { PrivateModeDialogComponent } from '../../private-mode-dialog/private-mode-dialog.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  isPrivateMode: boolean;
  isFavoriteMode: boolean;
  viewsList: IView[];

  constructor(private configService: ConfigService, private albumService: AlbumService, private dialog: MatDialog) {
    this.initAlbum();
  }
  ngOnInit(): void {
    // Get notified when private mode changes - to update icons.
    this.configService.onPrivateModeChanged.subscribe((isEnabled) => {
      this.isPrivateMode = isEnabled;
    });
  }

  initAlbum = async () => {
    this.isPrivateMode = this.configService.getPrivateMode();
    this.viewsList = await this.configService.getViewsList();
  }

  disablePrivateMode = () => {
    this.configService.setPrivateMode(false);
  }

  handleFavoriteClicked = () => {
    // Notify subscribers that Favorite Mode has changed.
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

  handleViewSelected = (view: IView) => {
    // Notify subscribers that the intended view mode has changed.
    this.albumService.onViewModeChanged.emit(view);
  }
}
