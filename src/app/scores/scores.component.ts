import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService, Player } from "../services/game.service";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {

  constructor(
    private gameService: GameService
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  players: MatTableDataSource<Player>;
  displayColumns: string[] = ["username", "bronze", "silver", "gold"];
  interval: any;

  ngOnInit() {

    // Update players every 20 seconds
    this.loadPlayers(true);
    this.interval = setInterval(()=>{
      this.loadPlayers(false)
    }, 20000)
  }

  // If player is search with value, apply filter to players
  applySearch(value: string) {
    this.players.filter = value.trim().toLowerCase();

    if (this.players.paginator) {
      this.players.paginator.firstPage();
    }
  }

  loadPlayers(first: boolean) {

    // Get player from backend
    this.gameService.getPlayers().subscribe((players) => {

      // If this is the first time
      if (first) {

        // Create new MatTableDataSource with sort and paginator
        this.players = new MatTableDataSource<Player>(players);
        this.players.sort = this.sort;
        this.players.paginator = this.paginator;

        // Set sorting to sort by gold
        this.players.sort.sort({ disableClear: false, id: "gold", start: "desc"})
      } else {

        // Update players
        this.players.data = players;
      }
    });


  }

}
