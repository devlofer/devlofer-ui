import { Component, OnInit } from '@angular/core';

declare var Spacekit: any;

@Component({
  selector: 'devlofer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor() {
    
  }

  ngOnInit() {
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

    // const roadster = viz.createObject('spaceman', {
    //   labelText: 'Starman',
    //   ephem: new Spacekit.Ephem({
    //     // These parameters define orbit shape.
    //     a: 1.324870564730606E+00,
    //     e: 2.557785995665682E-01,
    //     i: 1.077550722804860E+00,
        
    //     // These parameters define the orientation of the orbit.
    //     om: 3.170946964325638E+02,
    //     w: 1.774865822248395E+02,
    //     ma: 1.764302192487955E+02,
        
    //     // Where the object is in its orbit.
    //     epoch: 2458426.500000000,
    //   }, 'deg'),
    // });

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
  
}
