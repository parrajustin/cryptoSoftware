import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Rx';

import { ApiController } from '../../services';
import { handleSub, pad } from '../../util';

interface dialogResponse {
  'ip': string;
  'user': string;
  'pass': string;
}

interface unit {
  'WUdescription': string;
  'WUhost': string;
  'WUname': string;
  'WUpersistence_session': number;
  'WUpublished_date': string;
  'WUstatus': string;
}

// interface guArray {
//   'WUname': string;
//   'WGname': string;
// }

@Component({
  selector: 'persistant',
  templateUrl: './persistant.component.html',
  styleUrls: ['./persistant.component.less']
})
export class PersistantComponent implements OnInit {
  private subArray: Subscription[] = [];
  public data = [];
  private selectedGroups: string[] = [];

  constructor(
    private api: ApiController,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.getData();
  }

  public getData() {
    const sub = this.api.get<any>('/api/persistant').subscribe(
      (value) => {
        this.data = (value);
      }
    );

    this.subArray.push(sub);
  }

  public ngOnDestroy() {
    handleSub(this.subArray);
  }
}