import { Component, OnInit } from '@angular/core';
import {GameService, Player} from "../services/game.service";
import {MatDialog} from "@angular/material";
import {GoalPopupComponent} from "../goal-popup/goal-popup.component";
import {CookieService} from "ngx-cookie-service";

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

  ngOnInit() {
    if (this.cookieService.check('username')) {
      this.username = this.cookieService.get('username')
    }

    this.interval = setInterval(() => {
      if (this.username && this.username != "") {
        this.gameService.getPlayer(this.username).subscribe(player => this.player = player);
      }
    }, 1500)
  }

  openDialog(goal: string): void {
    const dialogRef = this.popup.open(GoalPopupComponent, {
      width: '50vw',
      height: '70vh',
      data: goal
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  changeUsername(username) {
    const now = new Date();
    this.cookieService.set('username', username, new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000))
    this.username = username;
  }

  click() {
    if (this.username === undefined || this.username === "") {
      this.username = "Guest-" + this.getRandomInt(99999);

    }
    this.gameService.click(this.username).subscribe((response) => {
      if (response.status == "error") {
        console.log(response.error);
      } else if (response.status == "gold" || response.status == "silver" || response.status == "bronze" ) {
        this.openDialog(response.status)
      }
    })
  }

}
