import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';

declare var Spacekit: any;

@Component({
  selector: 'devlofer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private http: HttpClient) {
    
  }

  ngOnInit() {
    this.getStarman().subscribe();
    // Create the visualization and put it in our div.
    const viz = new Spacekit.Simulation(document.getElementById('main-container'), {
      basePath: '.',
      assetPath: './',
      startDate: new Date(2020, 12, 25),
      // startPaused: true,

      camera: {
        initialPosition: [0, 1, 5],
        // enableDrift: true,
      },
    });

    // Create a skybox using NASA TYCHO artwork.
    const skybox = viz.createSkybox(Spacekit.SkyboxPresets.NASA_TYCHO);

    // Create our first object - the sun - using a preset space object.
    const sun = viz.createObject('sun', Spacekit.SpaceObjectPresets.SUN);

    // Then add some planets
    viz.createObject('earth', Object.assign(Spacekit.SpaceObjectPresets.EARTH, {labelText: 'Earth'}));
    viz.createObject('mars', Object.assign(Spacekit.SpaceObjectPresets.MARS, {labelText: 'Mars'}));

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
        'deg',
      ),
    });
  }

  private getStarman(): Observable<any> {
    return this.http.get(environment.services.starman);
  }
  
}
