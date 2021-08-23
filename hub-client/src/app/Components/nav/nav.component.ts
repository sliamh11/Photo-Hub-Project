import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from 'src/app/Services/config/config.service';
import { PrivateModeDialogComponent } from '../private-mode-dialog/private-mode-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isPrivateMode: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get notified when private mode changes to update icon & tab states.
    this.configService.onPrivateModeChanged.subscribe((isEnabled) => {
      this.isPrivateMode = isEnabled;
    });
  }

  exitPrivateMode = () => {
    this.configService.setPrivateMode(false);
  }

  openPrivateModeDialog = () => {
    const dialogRef = this.dialog.open(PrivateModeDialogComponent);

    dialogRef.afterClosed().subscribe((isEnabled) => {
      if (isEnabled) {
        this.configService.setPrivateMode(isEnabled);
        this.router.navigate(["/album"]);
      } else {
        this.snackBar.open("Wrong password.", "Ok");
      }
    });
  }
}
