import '../styles/headings.css';
import '../styles/styles.scss';

import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MD_PLACEHOLDER_GLOBAL_OPTIONS,
  MdButtonModule,
  MdCardModule,
  MdChipsModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdSelectModule,
  MdSidenavModule,
  MdSlideToggleModule,
  MdToolbarModule,
  MdTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { ROUTES } from './app.routes';
import { ENV_PROVIDERS } from './environment';
import { NoContentComponent } from './components/no-content';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    NoContentComponent
  ],
  entryComponents: [
  ],
  imports: [ // import Angular's modules
    FlexLayoutModule,
    BrowserAnimationsModule,
    MdIconModule,
    MdSidenavModule,
    MdDialogModule,
    MdTooltipModule,
    MdToolbarModule,
    MdChipsModule,
    MdSelectModule,
    MdCardModule,
    MdSlideToggleModule,
    MdInputModule,
    MdButtonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    CookieModule.forRoot({ path: 'sbc.com' }),
    /**
     * TODO: Change api key to one provided by AT&T
     */
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDoaxElYk3lLbsH7PeOAiriTBR1pQfGEQM'
    }),
    AgmSnazzyInfoWindowModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    {provide: MD_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'always' }}
  ]
})
export class AppModule {}
