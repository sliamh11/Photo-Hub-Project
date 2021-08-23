import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigService } from 'src/app/Services/config/config.service';

@Component({
  selector: 'app-private-mode-dialog',
  templateUrl: './private-mode-dialog.component.html',
  styleUrls: ['./private-mode-dialog.component.css']
})
export class PrivateModeDialogComponent {

  hidePassword: boolean;
  constructor(
    private dialogRef: MatDialogRef<boolean>,
    private snackBar: MatSnackBar,
    private configService: ConfigService) {
    this.hidePassword = true;
  }

  checkPasswordMatch = async (password: string) => {
    try {
      if (await this.configService.checkPasswordsMatch(password)) {
        this.dialogRef.close(true);
      } else {
        this.snackBar.open("Wrong password.", "Ok");
      }
    } catch (error) {
      this.snackBar.open(error.message, "Ok");
    }
  }
}
