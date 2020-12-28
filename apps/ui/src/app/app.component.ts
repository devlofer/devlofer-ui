import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

declare var Spacekit: any;

@Component({
  selector: 'devlofer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public starmanPosition: any = { flickr_images: [, , , ,] };
  public isSmallScreen: boolean;
  @ViewChild('iframe') iframe: ElementRef;

  constructor(
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.setScreenSize();
    this.getStarman().subscribe((position) => this.setStarman(position));
    // Create the visualization and put it in our div.
    const viz = new Spacekit.Simulation(
      document.getElementById('main-container'),
      {
        basePath: '.',
        assetPath: './',
        startDate: new Date(2020, 12, 25),
        // startPaused: true,

        camera: {
          initialPosition: [0, 1, 5],
          // enableDrift: true,
        },
      }
    );

    // Create a skybox using NASA TYCHO artwork.
    const skybox = viz.createSkybox(Spacekit.SkyboxPresets.NASA_TYCHO);

    // Create our first object - the sun - using a preset space object.
    const sun = viz.createObject('sun', Spacekit.SpaceObjectPresets.SUN);

    // Then add some planets
    viz.createObject(
      'earth',
      Object.assign(Spacekit.SpaceObjectPresets.EARTH, { labelText: 'Earth' })
    );
    viz.createObject(
      'mars',
      Object.assign(Spacekit.SpaceObjectPresets.MARS, { labelText: 'Mars' })
    );

    const roadster = viz.createObject('spaceman', {
      labelText: 'Starman',
      ephem: new Spacekit.Ephem(
        {
          a: 1.324870564730606,
          epoch: 2458426.5,
          e: 2.557785995665682e-1,
          i: 1.07755072280486,
          om: 3.170946964325638e2,
          w: 1.774865822248395e2,
          ma: 1.764302192487955e2,
        },
        'deg'
      ),
    });
  }

  private getStarman(): Observable<any> {
    return this.http.get(environment.services.starman);
  }

  private setStarman(position) {
    position.speed_mph = Math.ceil(position.speed_mph);
    position.earth_distance_mi = Math.ceil(position.earth_distance_mi);
    position.mars_distance_mi = Math.ceil(position.mars_distance_mi);
    position.launch_mass_lbs = Math.ceil(position.launch_mass_lbs);
    position.period_days = Math.ceil(position.period_days);
    this.iframe.nativeElement.setAttribute(
      'src',
      position.video.replace('youtu.be', 'youtube.com/embed')
    );
    this.starmanPosition = position;
  }

  private setScreenSize() {
    this.isSmallScreen = this.breakpointObserver.isMatched(
      '(max-width: 800px)'
    );
  }

  onResize() {
    this.setScreenSize();
  }
}
