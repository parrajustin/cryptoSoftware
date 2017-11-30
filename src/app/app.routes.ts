import { Routes } from '@angular/router';

// components
import { NoContentComponent } from './components/no-content';

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
  { path: '',      component: NoContentComponent },
  { path: '**',    component: NoContentComponent },
];
