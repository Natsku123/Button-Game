import { Component, HostListener, OnInit } from '@angular/core';
import { GameService, Player } from "../services/game.service";
import { MatDialog } from "@angular/material";
import { GoalPopupComponent } from "../goal-popup/goal-popup.component";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
  providers: [GameService]
})
export class FrontPageComponent implements OnInit {

  constructor(
    private gameService: GameService,
    private cookieService: CookieService,
    public popup: MatDialog
  ) { }

  username: string;
  player: Player;
  interval: any;
  screenWidth: number;

  // Update screenWidth when window is resized
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit() {

    // Get width of the window
    this.screenWidth = window.innerWidth;

    // Check if username is saved in cookies
    if (this.cookieService.check('username')) {

      // Get username from cookies
      this.username = this.cookieService.get('username')
    }


    // Update player info every 1.5 seconds
    this.interval = setInterval(() => {
      if (this.username && this.username != "") {
        this.gameService.getPlayer(this.username).subscribe(player => this.player = player);
      }
    }, 1500)
  }

  openDialog(goal: string): void {
    let width: string;
    let height: string;

    // Set dialog width and height based on window width
    if (this.screenWidth > 600) {
      width = "50vw";
      height = "70vh";
    } else {
      width = "98vw";
      height = "45vh";
    }

    // Open dialog with GoalPopupComponent
    const dialogRef = this.popup.open(GoalPopupComponent, {
      width: width,
      height: height,
      data: goal
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  // Generate random integer
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // Change username and save it as a cookie
  changeUsername(username) {
    const now = new Date();
    this.cookieService.set('username', username, new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000));
    this.username = username;
  }

  click() {
    // If username is not set
    if (this.username === undefined || this.username === "") {

      // Generate Guest username with 5 random numbers
      this.username = "Guest-" + this.getRandomInt(99999);
    }

    // Send click to backend
    this.gameService.click(this.username).subscribe((response) => {

      // If backend returns an error, print it to console
      if (response.status == "error") {
        console.error(response.error);
      } else if (response.status == "gold" || response.status == "silver" || response.status == "bronze" ) {

        // Open dialog with returned status
        this.openDialog(response.status)
      }
    })
  }

}
