import {Component, OnInit, ViewChild} from '@angular/core';
import {GameService, Player} from "../services/game.service";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

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
    this.loadPlayers(true);
    this.interval = setInterval(()=>{
      this.loadPlayers(false)
    }, 20000)
  }

  applySearch(value: string) {
    this.players.filter = value.trim().toLowerCase();

    if (this.players.paginator) {
      this.players.paginator.firstPage();
    }
  }

  loadPlayers(first: boolean) {
    this.gameService.getPlayers().subscribe((players) => {
      if (first) {
        this.players = new MatTableDataSource<Player>(players);
        this.players.sort = this.sort;
        this.players.paginator = this.paginator;
      } else {
        this.players.data = players;
      }
    });


  }

}
