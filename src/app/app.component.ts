import { Component, ViewEncapsulation } from '@angular/core';

enum MTGApps {
  WatchfulRadstag,
  CrystallineGiant
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class AppComponent {
  apps = MTGApps;
  selected: MTGApps | null;
}
