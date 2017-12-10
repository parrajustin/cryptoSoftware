import { Component, OnInit, Inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ApiController } from '../../../services';
import { handleSub } from '../../../util';
import { Subscription } from 'rxjs/Subscription';

interface unitArray {
  'WUdescription': string;
  'WUhost': string;
  'WUname': string;
  'WUpersistence_session': number;
  'WUpublished_date': string;
  'WUstatus': string;
}

@Component({
  selector: 'AddGroupDialogComponent',
  templateUrl: './addDialog.component.html',
  styleUrls: ['./addDialog.component.less']
})
export class AddGroupDialogComponent implements OnInit, OnDestroy { 
  public formGroup: FormGroup; 
  private subArray: Subscription[] = [];
  public units: unitArray[] = [];
  public unitsLoaded: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private api: ApiController,
    @Inject(MAT_DIALOG_DATA) public data: any[],
  ) {}

  public ngOnDestroy() {
    handleSub(this.subArray);
  }

  public getUnitData() {
    const sub = this.api.get('/api/unit').subscribe(
      (value) => {
        this.units = (value) as unitArray[];
        this.unitsLoaded = true;
      }
    );

    this.subArray.push(sub);
  }

  public ngOnInit() {
    this.getUnitData();
    this.formGroup = new FormGroup({
      'name': new FormControl('', Validators.required),
      'desc': new FormControl('', Validators.required),
      'units': new FormControl(''),
      'rmat': new FormControl('', Validators.required),
      'persist': new FormControl('', Validators.required),
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