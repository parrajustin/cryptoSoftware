import { BehaviorSubject } from 'rxjs/Rx';
import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroupDirective, NgForm, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { LogStateActions, IAppState } from '../../store';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {                                
  private _password: string = "";
  private _confirmPassword: string = "";
  public confirmObservable: BehaviorSubject<ValidationErrors|null> = new BehaviorSubject<ValidationErrors|null>({'confirm': true} as ValidationErrors);

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    (c) => {
      console.log(c);
      return null;
    }
  ], [
    (control: AbstractControl): Promise<ValidationErrors|null>|Observable<ValidationErrors|null> => {
      console.log('test');
      return this.confirmObservable;
    }
  ]);
  public formControl = new FormControl('', [
    Validators.required
  ])

  public matcher = new MyErrorStateMatcher();

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: LogStateActions
  ) {
    this.confirmObservable.subscribe((c) => {
      console.log(c);
    })
  }

  //                                                                         
  //                                                                         
  //                                                                         
  //                                                                         
  //                                                                         
  //                                                                         
  //  ppppp   ppppppppp     aaaaaaaaaaaaa      ssssssssss       ssssssssss   
  //  p::::ppp:::::::::p    a::::::::::::a   ss::::::::::s    ss::::::::::s  
  //  p:::::::::::::::::p   aaaaaaaaa:::::ass:::::::::::::s ss:::::::::::::s 
  //  pp::::::ppppp::::::p           a::::as::::::ssss:::::ss::::::ssss:::::s
  //   p:::::p     p:::::p    aaaaaaa:::::a s:::::s  ssssss  s:::::s  ssssss 
  //   p:::::p     p:::::p  aa::::::::::::a   s::::::s         s::::::s      
  //   p:::::p     p:::::p a::::aaaa::::::a      s::::::s         s::::::s   
  //   p:::::p    p::::::pa::::a    a:::::assssss   s:::::s ssssss   s:::::s 
  //   p:::::ppppp:::::::pa::::a    a:::::as:::::ssss::::::ss:::::ssss::::::s
  //   p::::::::::::::::p a:::::aaaa::::::as::::::::::::::s s::::::::::::::s 
  //   p::::::::::::::pp   a::::::::::aa:::as:::::::::::ss   s:::::::::::ss  
  //   p::::::pppppppp      aaaaaaaaaa  aaaa sssssssssss      sssssssssss    
  //   p:::::p                                                               
  //   p:::::p                                                               
  //  p:::::::p                                                              
  //  p:::::::p                                                              
  //  p:::::::p                                                              
  //  ppppppppp                                                              
  //                                         
  public password(value) {
    console.log("p: " + value);
    this._password = value;
    if (value === this._confirmPassword) {
      this.confirmObservable.next(null);
    } else {
      this.confirmObservable.next({'confirm': true});
    }
  }

  public confirmPassword(value) {
    console.log('cp: ' + value);
    this._confirmPassword = value;
    if (value === this._password) {
      this.confirmObservable.next(null);
    } else {
      this.confirmObservable.next({'confirm': true});
    }
  };

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

  public onRegister(event) {
    console.log(event);
  }
}