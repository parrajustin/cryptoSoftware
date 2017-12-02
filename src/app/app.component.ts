import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';

import { LogStateActions, IAppState } from './store';
import { LoginState } from './models';
import { handleSub } from './util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnDestroy {
  public loggedIn: LoginState = LoginState.notLoggedIn;
  public url: String = '';

  private subArray: Subscription[] = [];

  constructor(
    public router: Router,
    private ngRedux: NgRedux<IAppState>,
    private actions: LogStateActions
  ) {
    const loggedInSub = ngRedux.select<LoginState>('loginState')
    .subscribe(state => {
      this.loggedIn = state;

      let url = "#";
      switch (this.loggedIn) {
        case LoginState.guest:
          break;
        case LoginState.admin:
          url = "/server";
          break;
      }

      this.router.navigateByUrl(url).catch(
        (reason: any) => {
          console.error(JSON.stringify((reason)));
        }
      );
    });

    const routerSub = this.router.events.subscribe(
      (event: any) => {
        this.url = event['url'];
        console.log(event);
      }
    )

    this.subArray.push(loggedInSub, routerSub);
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
