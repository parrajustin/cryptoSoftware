import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'addDialog',
  templateUrl: './addDialog.component.html',
  styleUrls: ['./addDialog.component.less']
})
export class AddDialogComponent implements OnInit { 
  public serverForm: FormGroup; 

  public ipFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/([\d]+\.[\d]+\.[\d]+\.[\d]+([:][\d]+)?)$/)
  ]);

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any[],
  ) {}

  public ngOnInit() {
    this.serverForm = new FormGroup({
      'ip': this.ipFormControl,
      'user': new FormControl('', Validators.required),
      'pass': new FormControl('', Validators.required),
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