import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpRequest, HttpEventType} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {ConfigService} from "./config.service";
import {catchError} from "rxjs/internal/operators";

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

  apiAddress = ConfigService.settings.apiAddress;

  clickUrl = `${this.apiAddress}/v1.0/click/`;
  playersUrl = `${this.apiAddress}/v1.0/players/`;
  neededClicksUrl = `${this.apiAddress}/v1.0/needed-clicks/`;

  click(username): Observable<Status> {
    return this.http.post<Status>(this.clickUrl, {'username': username})
      .pipe(
        catchError(this.error_handler)
      )
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
      .pipe(
        catchError(this.error_handler)
      )
  }

  to_go(): Observable<Next> {
    return this.http.get<Next>(this.neededClicksUrl)
      .pipe(
        catchError(this.error_handler)
      )
  }


  error_handler(error: HttpErrorResponse) {
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
