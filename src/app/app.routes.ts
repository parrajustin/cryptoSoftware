import { Routes } from '@angular/router';

// components
import { ListComponent } from './components/home';
import { SingleComponent } from './components/single';
import { NoContentComponent } from './components/no-content';
import { MyComponent } from './components/my';
import { MapComponent } from './components/map';
import { UserComponent } from './components/user';

/**
 * Not to sure why this is necessary but if you remove it
 * a lot of errors get thrown
 *
 * TODO: fix router dependency on this
 *
 * DON'T DELETE ME!
 */
import { DataResolver } from './app.resolver';

/**
 * Routes are the different pages we have
 * 
 * Where path is the section to be directed to and component is code to run
 */
export const ROUTES: Routes = [
  { path: '',      component: ListComponent },
  { path: 'home/:list',  component: ListComponent },
  { path: 'home',  component: ListComponent },
  { path: 'map',  component: MapComponent },
  { path: 'assignments', component: MyComponent },
  { path: 'access', loadChildren: './components/+single#SingleModule' },
  { path: 'access/:type', loadChildren: './components/+single#SingleModule' },
  { path: 'access/:type/:id', loadChildren: './components/+single#SingleModule' },
  { path: 'users', component: UserComponent },
  { path: '**',    component: NoContentComponent },
];
