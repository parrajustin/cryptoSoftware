import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';

import { LogStateActions, IAppState } from '../../store';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: LogStateActions
  ) {}

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
  
  public clickGuestLogin() {
    this.ngRedux.dispatch(this.actions.guestLogin());
  }

  public clickLogin() {
    this.ngRedux.dispatch(this.actions.adminLogin());
  }
}
