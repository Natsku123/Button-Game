import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from "./material/material.module";
import { FrontPageComponent } from './front-page/front-page.component';
import { ScoresComponent } from './scores/scores.component';
import { ConfigService } from "./services/config.service";
import { GoalPopupComponent } from './goal-popup/goal-popup.component';
import { CookieService } from "ngx-cookie-service";


// Router urls
const appRoutes: Routes = [
  {path: "", component: FrontPageComponent},
  {path: "scores", component: ScoresComponent}
];

// Load config when app starts
export function initializeApp(Config: ConfigService) {
  return () => Config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    ScoresComponent,
    GoalPopupComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    ConfigService,
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ConfigService], multi: true},
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    GoalPopupComponent
  ]
})
export class AppModule { }
