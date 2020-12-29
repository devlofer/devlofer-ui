import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'devlofer-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
