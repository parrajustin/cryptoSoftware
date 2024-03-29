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
import { VirtualMachinesComponent, VMListComponent, CloneDialogComponent } from './components/virtualmachines';
import { WorkshopGroupsComponent, AddGroupDialogComponent, GroupListComponent } from './components/groups';
import { UsersComponent, UserListComponent, AddUserDialogComponent } from './components/users';
import { WorkshopUnitsComponent, AddUnitDialogComponent, UnitListComponent } from './components/unit';
import { TemporaryComponent, WorkshopListComponent } from './components/temporary';
import { PersistantComponent, WorkshopPListComponent } from './components/persistant';
import { DialogComponent } from './components/dialog';
import { WorkshopDialogComponent } from './components/workshopDetailed';
import { MenuComponent } from './components/menu';
import { StatComponent } from './components/stat';
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
  { path: 'stat', component: StatComponent, canActivate: [AdminGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
  { path: 'temp', component: TemporaryComponent },
  { path: 'persistant', component: PersistantComponent },
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
    UnitListComponent,
    GroupListComponent,
    UsersComponent,
    UserListComponent,
    AddUserDialogComponent,
    TemporaryComponent,
    WorkshopListComponent,
    PersistantComponent,
    VMListComponent,
    CloneDialogComponent,
    DialogComponent,
    WorkshopPListComponent,
    WorkshopDialogComponent,
    MenuComponent,
    StatComponent
  ],
  entryComponents: [
    AddGroupDialogComponent,
    AddDialogComponent,
    AddUnitDialogComponent,
    AddUserDialogComponent,
    CloneDialogComponent,
    DialogComponent,
    WorkshopDialogComponent,
    MenuComponent
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
