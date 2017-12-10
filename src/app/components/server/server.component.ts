import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';

import { AddDialogComponent } from './addDialog';
import { handleSub } from '../../util';
import { ApiController } from '../../services';

interface dialogResponse {
  'ip': string;
  'user': string;
  'pass': string;
}

@Component({
  selector: 'server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.less']
})
export class ServerComponent implements OnDestroy {
  private subArray: Subscription[] = [];

  constructor(
    private api: ApiController,
    private dialog: MatDialog,
  ) {}

  public openAddServer() {
    const config = {
      width: `auto`,
      height: `auto`,
      panelClass: 'u-remove-padding-dialog',
      data: [],
      disableClose: false
    };
    const temp: MatDialogRef<AddDialogComponent> = this.dialog.open(AddDialogComponent, config);

    const sub = temp.afterClosed().subscribe(
      (value: dialogResponse) => {
        if (typeof value == 'object') {
          const httpSub = this.api.post('/api/server/add', value).subscribe(
            (value) => {
              console.log(value);
            }
          );
          this.subArray.push(httpSub);
        }
      }
    );

    this.subArray.push(sub);
  }

  public ngOnDestroy() {
    handleSub(this.subArray);
  }
}
