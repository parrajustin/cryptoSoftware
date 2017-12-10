import { BehaviorSubject } from 'rxjs/Rx';
import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { LogStateActions, IAppState } from '../../store';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface RegisterResponse {
  'success': boolean;
  'reason': string;
  'token': string;
}

interface LoginResponse {
  'success': boolean;
  'reason': string;
  'token': string;
  'isAdmin': boolean;
  'lname': string;
  'fname': string;
  'skill': number;
}


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {   
  public register = {
    'fname': '',
    'lname': '',
    'org': '',
    'email': '',
    'pass': '',
    'skill': ''
  };

  public login = {
    'email': '',
    'pass': ''
  }

  public registerSubmit: boolean = false;

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  public passwordFormControl = new FormControl('', [ 
    Validators.required, 
    Validators.minLength(6),
    (c) => {
      console.log(c);
      return null;
    }
  ]); 
  public fnameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\S*$/)
  ]);
  public lnameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\S*$/)
  ]);

  public registerForm: FormGroup;
  public loginForm: FormGroup;

  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<IAppState>,
    private actions: LogStateActions
  ) {
  }
  

  public ngOnInit() {
    this.registerForm = new FormGroup({
      'fname': this.fnameFormControl,
      'lname': this.lnameFormControl,
      'org': new FormControl('', Validators.required),
      'cpass': new FormControl('', Validators.required),
      'skill': new FormControl('', Validators.required),
      'email': this.emailFormControl,
      'pass': this.passwordFormControl
    });

    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'pass': new FormControl('', Validators.required),
    });
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
  
  public clickGuestLogin() {
    this.ngRedux.dispatch(this.actions.guestLogin());
  }

  public clickLogin() {
    this.ngRedux.dispatch(this.actions.adminLogin());
  }

  public onLogin(event) {
    const len = event.directives.length;
    for (let i = 0; i < len; i++) {
      const directive = event.directives[i];
      this.login[directive.name] = directive.value;
    }    

    console.log(this.login);
    
    this.http.post<LoginResponse>(`/api/user/login`, this.login)
      .subscribe((response: LoginResponse) => {
        if (response.success) {
          console.log(response);
        } else {
          alert(response.reason);
        }
      });
  }

  public onRegister(event) {
    const len = event.directives.length;
    for (let i = 0; i < len; i++) {
      const directive = event.directives[i];
      if (directive.name !== "cpass") {
        this.register[directive.name] = directive.value;
      }
    }    

    console.log(this.register);

    this.registerSubmit = true;

    this.http.post<RegisterResponse>(`/api/user/register`, this.register)
      .subscribe((response: RegisterResponse) => {
        if (response.success) {
          console.log(response);
          this.ngRedux.dispatch(this.actions.setToken(response.token));
          this.ngRedux.dispatch(this.actions.registeredLogin());
        } else {
          alert(response.reason);
        }
      });
  }
}