import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from 'src/app/Services/config/config.service';
import { PrivateModeDialogComponent } from '../../private-mode-dialog/private-mode-dialog.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {

  isPrivateMode: boolean;

  constructor(private configService: ConfigService, private dialog: MatDialog) {
    this.isPrivateMode = this.configService.getPrivateMode();
    this.configService.onPrivateModeChanged.subscribe((isEnabled) => {
      this.isPrivateMode = isEnabled;
    });
  }

  disablePrivateMode = () => {
    this.configService.setPrivateMode(false);
  }

  openPrivateModeDialog = () => {
    const dialogRef = this.dialog.open(PrivateModeDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.configService.setPrivateMode(result);
      }
    });
  }

}
