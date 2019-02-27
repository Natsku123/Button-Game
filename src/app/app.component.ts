import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor (
    private snackBar: MatSnackBar,
    private cookieService: CookieService
  ) {}

  ngOnInit() {

    // If accept-cookies -cookie doesn't exist
    if (!this.cookieService.check("accept-cookies")) {

      // Cookie snackbar
      let snackBarRef = this.snackBar.open("This site uses cookies to save your username.", "Accept", {duration: 20000});

      // If snackbar is dismissed set accept-cookies true
      snackBarRef.afterDismissed().subscribe(() => {
        const now = new Date();
        this.cookieService.set("accept-cookies", "true", new Date(now.getTime(), + 30 * 24 * 60 * 60 * 1000))
      });

      // If snackbar action is pressed, set accept-cookies true
      snackBarRef.onAction().subscribe(() => {
        const now = new Date();
        this.cookieService.set("accept-cookies", "true", new Date(now.getTime(), + 30 * 24 * 60 * 60 * 1000))
      })
    }
  }
}
