import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/Services/config/config.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(
    private router: Router,
    private configService: ConfigService,
    private snackBar: MatSnackBar
  ) { }

  handleClick = async () => {
    // Check if Configuration data exists and navigate accordingly.
    try {
      if (await this.configService.isConfigDataExists()) {
        this.router.navigate(["upload-image"]);
      }
      else {
        this.router.navigate(["config"]);
      }
    } catch (error) {
      this.snackBar.open(`${error.message}`, "Ok");
    }
  }
}
