import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';

import { AddGroupDialogComponent } from './addDialog';
import { handleSub } from '../../util';
import { ApiController } from '../../services';

interface dialogResponse {
  'ip': string;
  'user': string;
  'pass': string;
}

interface serverArray {
  'user_name': string;
  'status': string;
  'ip_address': string;
}


@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.less']
})
export class WorkshopGroupsComponent {
  private subArray: Subscription[] = [];
  public servers: serverArray[] = []; 

  constructor(
    private api: ApiController,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    const serverSub = this.api.get('/api/server').subscribe(
      (value) => {
        this.servers = (value) as serverArray[];
      }
    );

    this.subArray.push(serverSub);
  }

  public openAddServer() {
    const config = {
      width: `auto`,
      height: `auto`,
      panelClass: 'u-remove-padding-dialog',
      data: [],
      disableClose: false
    };
    // const temp: MatDialogRef<AddDialogComponent> = this.dialog.open(AddDialogComponent, config);

    // const sub = temp.afterClosed().subscribe(
    //   (value: dialogResponse) => {
    //     if (typeof value == 'object') {
    //       const httpSub = this.api.post('/api/server/add', value).subscribe(
    //         (value) => {
    //           console.log(value);
    //         }
    //       );
    //       this.subArray.push(httpSub);
    //     }
    //   }
    // );

    // this.subArray.push(sub);
  }

  public ngOnDestroy() {
    handleSub(this.subArray);
  }
}
