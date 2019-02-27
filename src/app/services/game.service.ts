import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from "./config.service";
import { catchError } from "rxjs/internal/operators";

export interface Status {
  status: string;
  error: string;
}

export interface Player {
  id: number;
  username: string;
  clicks: number;
  bronze: number;
  silver: number;
  gold: number;
}

export interface Next {
  next: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  // Get apiAddress from config
  apiAddress = ConfigService.settings.apiAddress;

  // All different API urls
  clickUrl = `${this.apiAddress}/v1.0/click/`;
  playersUrl = `${this.apiAddress}/v1.0/players/`;
  neededClicksUrl = `${this.apiAddress}/v1.0/needed-clicks/`;

  // Send click to backend with username
  click(username): Observable<Status> {
    return this.http.post<Status>(this.clickUrl, {'username': username})
      .pipe(
        catchError(this.error_handler)
      )
  }

  // Get players from backend
  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
      .pipe(
        catchError(this.error_handler)
      )
  }

  // Get player from backend with username
  getPlayer(username: string): Observable<Player> {

    // Add username as a HTTP parameter
    const options = {params: new HttpParams().set("username", username)};
    return this.http.get<Player>(this.playersUrl, options)
      .pipe(
        catchError(this.error_handler)
      )
  }

  // Get next goal and amount of clicks needed from backend
  to_go(): Observable<Next> {
    return this.http.get<Next>(this.neededClicksUrl)
      .pipe(
        catchError(this.error_handler)
      )
  }


  error_handler(error: HttpErrorResponse) {

    // Print error to console.
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message)
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }

    return throwError('Error! Please try again!')

  }
}
