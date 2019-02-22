import {Component, Inject, OnInit} from '@angular/core';
import {GameService, Next} from "../services/game.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-goal-popup',
  templateUrl: './goal-popup.component.html',
  styleUrls: ['./goal-popup.component.scss'],
  providers: [GameService]
})
export class GoalPopupComponent implements OnInit {

  constructor(
    private gameService: GameService,
    public dialogRef: MatDialogRef<GoalPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public goal: string
  ) { }

  next: Next;
  interval: any;

  ngOnInit() {
    this.loadNextGoal();
    this.interval = setInterval(()=>{
      this.loadNextGoal()
    }, 1500)
  }

  closeDialog() {
    this.dialogRef.close();
  }

  loadNextGoal() {
    this.gameService.to_go().subscribe(next => this.next = next);
  }

}
