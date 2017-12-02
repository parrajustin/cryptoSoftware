import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';

// store
import { NgReduxModule, NgRedux } from '@angular-redux/store'; 

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { LoginComponent } from './components/login';
import { ServerComponent } from './components/server';
import { PageNotFoundComponent } from './components/pageNotFound';
import { rootReducer, IAppState, INITIAL_STATE, LogStateActions } from './store';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'server', component: ServerComponent },
  { path: 'virtualmachines', component: ServerComponent },
  { path: 'groups', component: ServerComponent },
  { path: 'units', component: ServerComponent },
  { path: 'stat', component: ServerComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    ServerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    NgReduxModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: !environment.production, useHash: true } // <-- debugging purposes only
    )
  ],
  providers: [LogStateActions],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    // Tell @angular-redux/store about our rootReducer and our initial state.
    // It will use this to create a redux store for us and wire up all the
    // events.
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE);
  }
}
