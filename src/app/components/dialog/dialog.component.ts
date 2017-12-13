import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'DialogComponent',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})
export class DialogComponent { 
  public options: string[] = [];
  public message: string = '';

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Object,
  ) {
    this.options = this.data['options'];
    this.message = this.data['message'];
  }

  public clickButton(event) {
    this.dialogRef.close(event);
  }
}