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
  selector: 'CloneDialogComponent',
  templateUrl: './cloneDialog.component.html',
  styleUrls: ['./cloneDialog.component.less']
})
export class CloneDialogComponent implements OnInit { 
  public formGroup: FormGroup; 
  public selected: string = '';
  public len: number = 0;
  public current: number = 0;
  private out = [];

  constructor(
    public dialogRef: MatDialogRef<any>,
    private api: ApiController,
    @Inject(MAT_DIALOG_DATA) public data: any[],
  ) {
    this.selected = data[0];
    this.len = data.length;
  }

  public ngOnInit() {
    this.formGroup = new FormGroup({
      'no': new FormControl('', Validators.required),
      'seed': new FormControl('', Validators.required),
      'nat': new FormControl('', Validators.required),
      'nseed': new FormControl('', Validators.required),
    });
  }

  public cancel() {
    this.formGroup = new FormGroup({
      'no': new FormControl('', Validators.required),
      'seed': new FormControl('', Validators.required),
      'nat': new FormControl('', Validators.required),
      'nseed': new FormControl('', Validators.required),
    });

    this.current += 1;

    if (this.current < this.len) {
      this.selected = this.data[this.current];
    } else {
      this.dialogRef.close(this.out);
    }
  }

  public onSubmit(event) {
    const obj = {
      'name': this.selected
    }

    const len = event.directives.length;
    for (let i = 0; i < len; i++) {
      const directive = event.directives[i];
      obj[directive.name] = directive.value;
    }    

    this.out.push(obj);

    this.cancel();
  }

}