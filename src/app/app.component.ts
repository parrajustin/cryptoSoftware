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
  /**
   * Reference to the container that holds this entire component
   * used to know the usable width and height
   *
   * @type {ElementRef}
   * @memberOf MyComponent
   */
  @ViewChild('mainContainer') public container: ElementRef;

  public logoSrc: string = 'assets/img/attlogo.png';

  /**
   * Weather or not the sidebar is currently open
   *
   * @type {boolean}
   * @memberOf AppComponent
   */
  public openedSet: boolean = false;

  /**
   * The mode of the sidebar
   *
   * @type {string}
   * @memberOf AppComponent
   */
  public modeSet: string = 'over';

  /**
   * The width of the window
   *
   * @type {number}
   * @memberOf AppComponent
   */
  public windowWidth: number = 0;

  /**
   * The height of the component view
   *
   * @type {number}
   * @memberOf AppComponent
   */
  public componentHeight: number = 0;

  /**
   * The width of the component view
   *
   * @type {number}
   * @memberOf AppComponent
   */
  public componentWidth: number = 0;

  /**
   * The text displayed on the header of the app
   *
   * @type {string}
   * @memberof AppComponent
   */
  public header: { pre: string, post: string; } = { pre: '', post: ''};

  public cartLength: number = 0;

  public name: string = '';
  /**
   * The view variable that holds the first section of the header
   *
   * @private
   * @type {string}
   * @memberof AppComponent
   */
  private view: string = '';

  /**
   * The type variable holds the current datatype the app is on
   *
   * @private
   * @type {DataTypes}
   * @memberof AppComponent
   */
  private type: DataTypes;

  /**
   * Emitter to send button commands to the children components
   *
   * @private
   * @type {EventEmitter<string>}
   * @memberof AppComponent
   */
  private buttonEmitter: EventEmitter<string>;

  private subArray: Subscription[] = [];

  constructor(
    public router: Router,
    public api: ApiController,
    private store: Store<fromRoot.State>,
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

    // global login
    // if (process.env.NODE_ENV === 'production') {
    if (process.env.NODE_ENV === 'production') {
      if (isUndefined(this.cookieService.get('attESSec')) && isUndefined(this.cookieService.get('attESHr'))) {
        const redirect = 'https://www.e-access.sbc.com/empsvcs/hrpinmgt/pagLogin/?retURL= ' +
          'http://cldprd0iis01418.itservices.sbc.com/RFEng/wireline.js/&sysName=27295';
        this.document.location.href = redirect;
      } else {
        let readCookie2 = this.cookieService.get('attESHr');

        const exploded = readCookie2.split('|');
        this.name = exploded[0] + ' ' + exploded[1];
        const uid = exploded[7].split(',')[0];

        let decryptedCookie = this.api.handleCookie(uid, this.name).then(
          (value: string) => {
            this.name = value;
          }, (err) => {
            console.error(JSON.stringify(err) || 'COOKIE SERVICE ERROR IN LOOP');
          }
        ).catch(
          (reason) => {
            throw new error(JSON.stringify(reason) || 'Cookie service error');
          }
        );
      }
    } else {
      this.name = 'JUSTIN PARRA';

      this.api.handleCookie('jp072h', this.name).then(
        (value: string) => {
          this.name = value;
        }, (err) => {
          console.error(JSON.stringify(err) || 'COOKIE SERVICE ERROR IN LOOP');
        }
      ).catch(
        (reason) => {
          throw new error(JSON.stringify(reason) || 'Cookie service error');
        }
      );
    }

    // Checks the size of the window
    if ( window.innerWidth > 960 ) {
      this.windowWidth = window.innerWidth;
      this.modeSet = 'side';
      this.openedSet = true;
    }

    this.componentHeight = this.container.nativeElement.offsetHeight;
    this.componentWidth = this.container.nativeElement.offsetWidth;

    this.store.dispatch(new actions.SetHeightAction(this.componentHeight - 10));
    this.store.dispatch(new actions.SetWidthAction(this.componentWidth - 10));
    this.store.dispatch(new actions.SetTypeAction(model.DataTypes.trList));

    // view store subscription
    const viewSubscription = this.store.select(fromRoot.getView).subscribe(
      (value: string) => {
        this.view = value;
        // this.cdr.detectChanges();
        this.header = { pre: this.view, post: this.header.post };
      }
    );

    const buttonSubscription = this.store.select(fromRoot.getButtonEmitter).subscribe(
      (value: EventEmitter<string>) => {
        this.buttonEmitter = value;
      }
    );

    // data type store subscription
    const headerSubscription = this.store.select(fromRoot.getDataType).subscribe(
      (value: DataTypes) => {
        let typeString = '';
        ApiController.dataType = value;
        console.log(value);

        switch (value) {
          default:
            typeString = '';
            break;
          case DataTypes.trList:
            typeString = 'TR';
            break;
          case DataTypes.siteList:
            typeString = 'Site';
            break;
          case DataTypes.partList:
            typeString = 'Part';
            break;
          case DataTypes.orderList:
            typeString = 'Order';
            break;
        }

        console.log(this.view);

//        this.header = this.view + ' ' + typeString;
        this.header = { pre: this.view, post: typeString };
        this.type = value;
      }
    );

    const cartSubscription = this.store.select(fromRoot.getCart).subscribe(
      (value: model.equipment_reference[]) => {
        this.cartLength = value.length;
      }
    );

    this.subArray.push(cartSubscription, headerSubscription, buttonSubscription, viewSubscription);
    this.api.startSub();
  }

  /**
   * Angular 2 lifecycle hook
   *
   *
   * @memberOf AppComponent
   */
  public ngAfterContentChecked() {
    let tempWindowWidth = window.innerWidth;
    let tempHeight = this.container.nativeElement.offsetHeight;
    let tempWidth = this.container.nativeElement.offsetWidth;

    if ( tempWindowWidth !== this.windowWidth || tempWidth !== this.componentWidth || tempHeight !== this.componentHeight ) {
      this.windowWidth = tempWindowWidth;
      this.componentHeight = tempHeight;
      this.componentWidth = tempWidth;

      this.store.dispatch(new actions.SetHeightAction(this.componentHeight - 10));
      this.store.dispatch(new actions.SetWidthAction(this.componentWidth - 10));

      if ( this.windowWidth > 960 ) {
        this.modeSet = 'side';
      } else {
        this.modeSet = 'over';
      }

    }
  }

  /**
   * Lifecycle hook only when this component is dying
   *
   *
   * @memberOf AppComponent
   */
  public ngOnDestroy() {
    // this.apiHost.stopSubscriptions();
    handleSub(this.subArray);

    this.api.stopSub();
  }

  public clickReject() {
    this.buttonEmitter.emit('reject');
  }

  public clickApprove() {
    this.buttonEmitter.emit('approve');
  }

  public clearCart() {
    this.store.dispatch(new actions.ClearClart());
  }

  public clickGarbage() {
    this.buttonEmitter.emit('garbage');
  }

  /**
   * Function used by sidbar to navigate to tr home list
   *
   *
   * @memberOf AppComponent
   */
  public trHome() {
    this.store.dispatch(new actions.SetTypeAction(DataTypes.trList));
    this.router.navigateByUrl('/home/TR').catch(
      (reason: any) => {
        console.error(JSON.stringify((reason)));
      }
    );
  }

  /**
   * Funciton used by sidebar to navigate to tr add component
   *
   *
   * @memberOf AppComponent
   */
  public trAdd() {
    this.store.dispatch(new actions.SetTypeAction(DataTypes.trList));
    this.store.dispatch(new actions.SetViewAction('Add'));
    this.router.navigateByUrl('/access/TR').catch(
      (reason: any) => {
        console.error(JSON.stringify((reason)));
      }
    );
  }

  /**
   * Function used by sidebar to navigate to site home list
   *
   *
   * @memberOf AppComponent
   */
  public siteHome() {
    this.store.dispatch(new actions.SetTypeAction(DataTypes.siteList));
    this.router.navigateByUrl('/home/Site').catch(
      (reason: any) => {
        console.error(JSON.stringify((reason)));
      }
    );
  }

  /**
   * Funciton used by sidebar to navigate to the site add component
   *
   *
   * @memberOf AppComponent
   */
  public siteAdd() {
    this.store.dispatch(new actions.SetTypeAction(DataTypes.siteList));
    this.store.dispatch(new actions.SetViewAction('Add'));
    this.router.navigateByUrl('/access/Site').catch(
      (reason: any) => {
        console.error(JSON.stringify((reason)));
      }
    );
  }

  /**
   * Function used by sidebar to navigate to part home list
   *
   *
   * @memberOf AppComponent
   */
  public partHome() {
    this.store.dispatch(new actions.SetTypeAction(DataTypes.partList));
    this.router.navigateByUrl('/home/Part').catch(
      (reason: any) => {
        console.error(JSON.stringify((reason)));
      }
    );
  }

  /**
   * Funciton used by sidebar to navigate to part add component
   *
   *
   * @memberOf AppComponent
   */
  public partAdd() {
    this.store.dispatch(new actions.SetTypeAction(DataTypes.partList));
    this.store.dispatch(new actions.SetViewAction('Add'));
    this.router.navigateByUrl('/access/Equipment').catch(
      (reason: any) => {
        console.error(JSON.stringify((reason)));
      }
    );
  }

  /**
   * Function used by sidebar to navigate to order home list
   *
   *
   * @memberOf AppComponent
   */
  public orderHome() {
    this.store.dispatch(new actions.SetTypeAction(DataTypes.orderList));
    this.router.navigateByUrl('/home/Order').catch(
      (reason: any) => {
        console.error(JSON.stringify((reason)));
      }
    );
  }

  /**
   * Function used by sidebar to navigate to order add component
   *
   *
   * @memberOf AppComponent
   */
  public orderAdd() {
    this.store.dispatch(new actions.SetTypeAction(DataTypes.orderList));
    this.store.dispatch(new actions.SetViewAction('Add'));
    this.router.navigateByUrl('/access/Order').catch(
      (reason: any) => {
        console.error(JSON.stringify((reason)));
      }
    );
  }

  /**
   * Function used by sidebar to navigate to the my component
   *
   *
   * @memberOf AppComponent
   */
  public myAssignments() {
    this.store.dispatch(new actions.SetTypeAction(100));
    this.store.dispatch(new actions.SetViewAction('My Assignments'));
    this.router.navigateByUrl('/assignments').catch(
      (reason: any) => {
        console.error(JSON.stringify((reason)));
      }
    );
  }

  public map() {
    this.store.dispatch(new actions.SetTypeAction(101));
    this.store.dispatch(new actions.SetViewAction('Map'));
    this.router.navigateByUrl('/map').catch(
      (reason: any) => {
        console.error(JSON.stringify((reason)));
      }
    );
  }

  public clickUser() {
    this.store.dispatch(new actions.SetTypeAction(101));
    this.store.dispatch(new actions.SetViewAction('Users'));
    this.router.navigateByUrl('/users').catch(
      (reason: any) => {
        console.error(JSON.stringify((reason)));
      }
    );
  }

  /**
   * Function used by sidebar to check if we are currently on the tr pages
   *
   * @returns {boolean}
   *
   * @memberOf AppComponent
   */
  public isTR(): boolean {
    return this.type === DataTypes.trList;
  }

  /**
   * Function used by sidebar to check if we are currently on teh site pages
   *
   * @returns {boolean}
   *
   * @memberOf AppComponent
   */
  public isSite(): boolean {
    return this.type === DataTypes.siteList;
  }

  /**
   * Function used by sidebar to check if we are currently on the order pages
   *
   * @returns {boolean}
   *
   * @memberOf AppComponent
   */
  public isOrder(): boolean {
    return this.type === DataTypes.orderList;
  }

  /**
   * Function used by sidebar to check if we are currently on the part pages
   *
   * @returns {boolean}
   *
   * @memberOf AppComponent
   */
  public isPart(): boolean {
    return this.type === DataTypes.partList;
  }

  /**
   * function used by sidebar to check if we are currently on my assignments
   *
   * @returns {boolean}
   *
   * @memberOf AppComponent
   */
  public isAssignment(): boolean {
    return this.view === 'My Assignments';
  }

  public isMap(): boolean {
    return this.view === 'Map';
  }

  public isUser(): boolean {
    return this.view === 'Users';
  }

  public isView(): boolean {
    return this.view === 'View';
  }

  public isAdd(): boolean {
    return this.view === 'Add';
  }

  public isEdit(): boolean {
    return this.view === 'Edit';
  }

  public isApprover(): boolean {
    return this.api.getRole() >= 2;
  }

  public isAdmin(): boolean {
    return this.api.getRole() >= 9;
  }

  public headerButtonEvent() {
    if ( this.isAdd() ) {
      this.buttonEmitter.emit('add');
    } else if ( this.isEdit() ) {
      this.buttonEmitter.emit('edit');
    } else if ( this.isView() ) {
      this.buttonEmitter.emit('view');
    } else if (this.isPart() && !this.isView() && !this.isAdd() && !this.isEdit()) {
      this.buttonEmitter.emit('checkout');
    }
  }
}
