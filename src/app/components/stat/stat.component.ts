import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Rx';

import { ApiController } from '../../services';
import { handleSub } from '../../util';
// import { AddUnitDialogComponent } from './addDialog';
import { DialogComponent } from '../dialog';

// interface dialogResponse {
//   'ip': string;
//   'user': string;
//   'pass': string;
// }

// interface unitArray {
//   'WUdescription': string;
//   'WUhost': string;
//   'WUname': string;
//   'WUpersistence_session': number;
//   'WUpublished_date': string;
//   'WUstatus': string;
// }

@Component({
  selector: 'stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.less']
})
export class StatComponent {
  // private subArray: Subscription[] = [];
  // public data: unitArray[] = []; 
  // private selectedUnits: string[] = [];

  // constructor(
  //   private api: ApiController,
  //   private dialog: MatDialog,
  // ) {}

  // public ngOnInit() {
  //   this.getData();
  // }

  // public getData() {
  //   const sub = this.api.get('/api/unit').subscribe(
  //     (value) => {
  //       this.data = (value) as unitArray[];
  //     }
  //   );

  //   this.subArray.push(sub);
  // }

  // public openAdd() {
  //   const config = {
  //     width: `auto`,
  //     height: `auto`,
  //     panelClass: 'u-remove-padding-dialog',
  //     data: [],
  //     disableClose: false
  //   };
  //   const temp: MatDialogRef<AddUnitDialogComponent> = this.dialog.open(AddUnitDialogComponent, config);

  //   const sub = temp.afterClosed().subscribe(
  //     (value: dialogResponse) => {
  //       if (typeof value == 'object') {
  //         console.log(value);
  //         const httpSub = this.api.post('/api/unit/add', value).subscribe(
  //           (value) => {
  //             console.log(value);
  //             this.getData();
  //           }
  //         );
  //         this.subArray.push(httpSub);
  //       }
  //     }
  //   );

  //   this.subArray.push(sub);
  // }

  // public onClickDelete() {
  //   if (this.selectedUnits.length == 0) {
  //     return;
  //   }
    
  //   const config = {
  //     width: `auto`,
  //     height: `auto`,
  //     panelClass: 'u-remove-padding-dialog',
  //     data: { 'options': ['yes', 'no'], 'message': 'Are you sure you want to delete these users?'},
  //     disableClose: true
  //   };
  //   const temp: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent, config);

  //   const sub = temp.afterClosed().subscribe(
  //     (value: dialogResponse) => {
  //       if (typeof value == 'string' && value === 'yes') {
  //         const len = this.selectedUnits.length;
  //         for (let i = 0; i < len; i++) {
  //           console.log('deleting: ' +  this.selectedUnits[i]);
  //           const httpSub = this.api.post('/api/unit/remove', { unit: this.selectedUnits[i]}).subscribe(
  //             (value) => {
  //               console.log(value);
  //               this.getData();
  //             }
  //           );
  //           this.subArray.push(httpSub);
  //         }
  //       }
  //     }
  //   );

  //   this.subArray.push(sub);
  // }

  // public deleteEvent(event) {
  //   if (event['add']) {
  //     this.selectedUnits.push(event['key']);
  //   } else {
  //     const index = this.selectedUnits.indexOf(event['key']);
  //     if (index != -1) {
  //       this.selectedUnits.splice(index, 1);
  //     }
  //   }
  //   console.log(this.selectedUnits);
  // }

  // public ngOnDestroy() {
  //   handleSub(this.subArray);
  // }
}

