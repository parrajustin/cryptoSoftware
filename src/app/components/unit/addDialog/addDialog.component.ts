import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'addUnitDialog',
  templateUrl: './addDialog.component.html',
  styleUrls: ['./addDialog.component.less']
})
export class AddUnitDialogComponent implements OnInit { 
  public formGroup: FormGroup; 

  constructor(
    public dialogRef: MatDialogRef<any>,
  ) {}

  public ngOnInit() {
    this.formGroup = new FormGroup({
      'name': new FormControl('', Validators.required),
      'vms': new FormControl(''),
      'description': new FormControl('', Validators.required),
      'host': new FormControl('', Validators.required),
      'persist': new FormControl('', Validators.required)
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