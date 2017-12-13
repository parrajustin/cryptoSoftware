import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'workshopDetailedDialogComponent',
  templateUrl: './workshopDetailed.component.html',
  styleUrls: ['./workshopDetailed.component.less']
})
export class WorkshopDialogComponent { 
  public item = {};
  public isPersist = false;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Object,
  ) {
    console.log(data);
    this.item = data['data'];
    this.isPersist = data['persist'];
  }

  public clickButton(event) {
    // this.dialogRef.close(event);
  }
}