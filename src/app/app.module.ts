import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login';
import { PageNotFoundComponent } from './components/pageNotFound';
import { ServerComponent, AddDialogComponent } from './components/server';
import { VirtualMachinesComponent } from './components/virtualmachines';
import { WorkshopGroupsComponent } from './components/groups';
import { WorkshopUnitsComponent } from './components/units';
import { IAppState, INITIAL_STATE, LogStateActions, rootReducer } from './store';

//guard
import { AdminGuard, ApiController } from './services';

// store
const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'virtualmachines', component: VirtualMachinesComponent, canActivate: [AdminGuard] },
  { path: 'groups', component: WorkshopGroupsComponent, canActivate: [AdminGuard] },
  { path: 'units', component: WorkshopUnitsComponent, canActivate: [AdminGuard] },
  { path: 'server', component: ServerComponent, canActivate: [AdminGuard] },
  { path: 'stat', component: ServerComponent, canActivate: [AdminGuard] },
  { path: '*', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    ServerComponent,
    WorkshopUnitsComponent,
    VirtualMachinesComponent,
    WorkshopGroupsComponent,
    AddDialogComponent
  ],
  entryComponents: [
    AddDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    NgReduxModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: !environment.production, useHash: true } // <-- debugging purposes only
    )
  ],
  providers: [LogStateActions, AdminGuard, ApiController],
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
