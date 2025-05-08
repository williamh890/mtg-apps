import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CrystallineGiantComponent } from './crystalline-giant/crystalline-giant.component';
import { WatchfulRadstagComponent } from './watchful-radstag/watchful-radstag.component';
import { CardSelectorComponent } from './card-selector/card-selector.component';


const appRoutes: Routes = [
  { path: 'crystalline-giant', component: CrystallineGiantComponent },
  { path: 'watchful-radstag', component: WatchfulRadstagComponent },
  { path: '**', component: CardSelectorComponent },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes, { enableTracing: true }  // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,

    CardSelectorComponent,
    WatchfulRadstagComponent,
    CrystallineGiantComponent,
  ],
  providers: [
    provideAnimations(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
