import { Component, Inject, OnInit } from '@angular/core';
import { GameService, Next } from "../services/game.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

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

    // Update next goal from backend every 1.5 seconds
    this.loadNextGoal();
    this.interval = setInterval(()=>{
      this.loadNextGoal()
    }, 1500)
  }

  // Close dialog
  closeDialog() {
    this.dialogRef.close();
  }

  // Get next goal from backend
  loadNextGoal() {
    this.gameService.to_go().subscribe(next => this.next = next);
  }

}
