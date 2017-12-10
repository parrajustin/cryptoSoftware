import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatSelectModule, MatDialogModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login';
import { PageNotFoundComponent } from './components/pageNotFound';
import { ServerComponent, AddDialogComponent, ServerListComponent } from './components/server';
import { VirtualMachinesComponent } from './components/virtualmachines';
import { WorkshopGroupsComponent, AddGroupDialogComponent } from './components/groups';
import { WorkshopUnitsComponent, AddUnitDialogComponent, UnitListComponent } from './components/unit';
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
    ServerListComponent,
    WorkshopUnitsComponent,
    VirtualMachinesComponent,
    WorkshopGroupsComponent,
    AddDialogComponent,
    AddGroupDialogComponent,
    AddUnitDialogComponent,
    UnitListComponent
  ],
  entryComponents: [
    AddGroupDialogComponent,
    AddDialogComponent,
    AddUnitDialogComponent
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
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
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
