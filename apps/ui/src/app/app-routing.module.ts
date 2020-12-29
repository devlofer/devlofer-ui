import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformationComponent } from './information/information.component';
import { StarmanComponent } from './starman/starman.component';

const appRoutes: Routes = [
  {
    path: '',
    component: StarmanComponent,
  },
  {
    path: 'info',
    component: InformationComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
