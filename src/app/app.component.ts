import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { LogStateActions, IAppState } from './store';
import { LoginState } from './models';
import { handleSub } from './util';
import { MenuComponent } from './components/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnDestroy {
  public loggedIn: LoginState = LoginState.notLoggedIn;
  public url: String = '';
  public name: string = '';

  private subArray: Subscription[] = [];

  constructor(
    public router: Router,
    private dialog: MatDialog,
    private ngRedux: NgRedux<IAppState>,
    private actions: LogStateActions
  ) {
    const nameSub = ngRedux.select('name').subscribe(
      state => {
        console.log(state);
        this.name = <any> state;
      }
    );

    const loggedInSub = ngRedux.select<LoginState>('loginState')
    .subscribe(state => {
      this.loggedIn = state;

      let url = "";
      switch (this.loggedIn) {
        case LoginState.guest:
        case LoginState.registered:
          url = "/temp";
          break;
        case LoginState.admin:
          url = "/server";
          break;
      }

      this.router.navigateByUrl(url).catch(
        (reason: any) => {
          throw new Error(reason);
        }
      );
    });

    const routerSub = this.router.events.subscribe(
      (event: any) => {
        this.url = event['url'];
        console.log(event);
      }
    )

    this.subArray.push(loggedInSub, routerSub, nameSub);
  }

  ngOnDestroy() {
    handleSub(this.subArray);
  }
  
  //                                                                                                                        
  //                                                                                                                        
  //                                                                                         tttt                           
  //                                                                                      ttt:::t                           
  //                                                                                      t:::::t                           
  //                                                                                      t:::::t                           
  //      eeeeeeeeeeee  vvvvvvv           vvvvvvv eeeeeeeeeeee    nnnn  nnnnnnnn    ttttttt:::::ttttttt        ssssssssss   
  //    ee::::::::::::ee v:::::v         v:::::vee::::::::::::ee  n:::nn::::::::nn  t:::::::::::::::::t      ss::::::::::s  
  //   e::::::eeeee:::::eev:::::v       v:::::ve::::::eeeee:::::een::::::::::::::nn t:::::::::::::::::t    ss:::::::::::::s 
  //  e::::::e     e:::::e v:::::v     v:::::ve::::::e     e:::::enn:::::::::::::::ntttttt:::::::tttttt    s::::::ssss:::::s
  //  e:::::::eeeee::::::e  v:::::v   v:::::v e:::::::eeeee::::::e  n:::::nnnn:::::n      t:::::t           s:::::s  ssssss 
  //  e:::::::::::::::::e    v:::::v v:::::v  e:::::::::::::::::e   n::::n    n::::n      t:::::t             s::::::s      
  //  e::::::eeeeeeeeeee      v:::::v:::::v   e::::::eeeeeeeeeee    n::::n    n::::n      t:::::t                s::::::s   
  //  e:::::::e                v:::::::::v    e:::::::e             n::::n    n::::n      t:::::t    ttttttssssss   s:::::s 
  //  e::::::::e                v:::::::v     e::::::::e            n::::n    n::::n      t::::::tttt:::::ts:::::ssss::::::s
  //   e::::::::eeeeeeee         v:::::v       e::::::::eeeeeeee    n::::n    n::::n      tt::::::::::::::ts::::::::::::::s 
  //    ee:::::::::::::e          v:::v         ee:::::::::::::e    n::::n    n::::n        tt:::::::::::tt s:::::::::::ss  
  //      eeeeeeeeeeeeee           vvv            eeeeeeeeeeeeee    nnnnnn    nnnnnn          ttttttttttt    sssssssssss    
  //                                                                                                                        
  //                                                                                                                        
  //                                                                                                                        
  //                                                                                                                        
  //                                                                                                                        
  //                                                                                                                        
  //    

  public clickMenu() {
    const config = {
      width: `auto`,
      height: `auto`,
      panelClass: 'u-remove-padding-dialog',
      data: this.loggedIn === LoginState.admin,
      disableClose: false
    };
    const temp: MatDialogRef<MenuComponent> = this.dialog.open(MenuComponent, config);

    const sub = temp.afterClosed().subscribe(
      (value) => {
        if (typeof value == 'string') {
          this.ngRedux.dispatch(this.actions.logout());
          this.router.navigateByUrl("/").catch(
            (reason: any) => {
              throw new Error(reason);
            }
          );
        }
      }
    );

    this.subArray.push(sub);
  }

  public clickServer() {
    this.router.navigateByUrl('/server').catch(
      (reason: any) => {
        console.error(JSON.stringify((reason)));
      }
    );
  }

  public clickVMs() {
    this.router.navigateByUrl('/virtualmachines').catch(
      (reason: any) => {
        console.error(JSON.stringify((reason)));
      }
    );
  }

  public clickGroup() {
    this.router.navigateByUrl('/groups').catch(
      (reason: any) => {
        console.error(JSON.stringify((reason)));
      }
    );
  }

  public clickUnits() {
    this.router.navigateByUrl('/units').catch(
      (reason: any) => {
        console.error(JSON.stringify((reason)));
      }
    );
  }

  public clickStat() {
    this.router.navigateByUrl('/stat').catch(
      (reason: any) => {
        console.error(JSON.stringify((reason)));
      }
    );
  }

}
