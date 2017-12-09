import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatSelectModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login';
import { PageNotFoundComponent } from './components/pageNotFound';
import { ServerComponent } from './components/server';
import { VirtualMachinesComponent } from './components/virtualmachines';
import { WorkshopGroupsComponent } from './components/groups';
import { WorkshopUnitsComponent } from './components/units';
import { IAppState, INITIAL_STATE, LogStateActions, rootReducer } from './store';

// store
const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'server', component: ServerComponent },
  { path: 'virtualmachines', component: VirtualMachinesComponent },
  { path: 'groups', component: WorkshopGroupsComponent },
  { path: 'units', component: WorkshopUnitsComponent },
  { path: 'stat', component: ServerComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    ServerComponent,
    WorkshopUnitsComponent,
    VirtualMachinesComponent,
    WorkshopGroupsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    NgReduxModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
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
