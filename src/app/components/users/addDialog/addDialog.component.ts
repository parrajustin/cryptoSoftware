import { Component, OnInit, Inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ApiController } from '../../../services';
import { handleSub } from '../../../util';
import { Subscription } from 'rxjs/Subscription';

interface user {
  'email': string;
  'first_name': string;
  'last_name': string;
  'organization': string;
  'skill_level': number;
  'is_admin': boolean;
}

@Component({
  selector: 'AddUserDialogComponent',
  templateUrl: './addDialog.component.html',
  styleUrls: ['./addDialog.component.less']
})
export class AddUserDialogComponent implements OnInit { 
  public formGroup: FormGroup; 

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
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

  constructor(
    public dialogRef: MatDialogRef<any>,
    private api: ApiController,
    @Inject(MAT_DIALOG_DATA) public data: any[],
  ) {}

  public ngOnInit() {
    this.formGroup = new FormGroup({
      'fname': this.fnameFormControl,
      'lname': this.lnameFormControl,
      'org': new FormControl('', Validators.required),
      'cpass': new FormControl('', Validators.required),
      'skill': new FormControl('', Validators.required),
      'email': this.emailFormControl,
      'pass': this.passwordFormControl
    });
  }

  public onSubmit(event) {
    const obj = {
      
    }

    const len = event.directives.length;
    for (let i = 0; i < len; i++) {
      const directive = event.directives[i];
      obj[directive.name] = directive.value;
    }    

    console.log(obj);
    this.dialogRef.close(obj);
  }

}