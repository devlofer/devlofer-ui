import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

import { StarmanComponent } from './starman.component';

describe('StarmanComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarmanComponent],
      imports: [
        HttpClientModule,
        MatCardModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        FlexLayoutModule,
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(StarmanComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
