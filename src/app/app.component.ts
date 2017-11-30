import { error } from 'util';
import {
  AfterContentChecked,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Inject
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isUndefined } from 'lodash/core';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { DOCUMENT } from '@angular/platform-browser';

import * as actions from './actions/state';
import * as model from './model';
import { DataTypes } from './model';
import * as fromRoot from './reducers';
import { ApiController, handleSub } from './services';
import { NoContentComponent } from './components/no-content';

/*
 * Angular 2 decorators and services
 */
/**
 * This apps top level component
 *
 * @export
 * @class AppComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterContentChecked, OnDestroy {

  constructor(
    public router: Router,
    private cookieService: CookieService,
    @Inject(DOCUMENT) private document: any
    // private cdr: ChangeDetectorRef
  ) {}

  /**
   * Lifecycle hook only when this component is being initialized
   *
   *
   * @memberOf AppComponent
   */
  public ngOnInit() {
  }

  /**
   * Angular 2 lifecycle hook
   *
   *
   * @memberOf AppComponent
   */
  public ngAfterContentChecked() {
  }

  /**
   * Lifecycle hook only when this component is dying
   *
   *
   * @memberOf AppComponent
   */
  public ngOnDestroy() {
  }
}
