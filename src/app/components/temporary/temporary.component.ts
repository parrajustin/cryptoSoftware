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
  selector: 'temporary',
  templateUrl: './temporary.component.html',
  styleUrls: ['./temporary.component.less']
})
export class TemporaryComponent implements OnInit {
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
    const sub = this.api.get<any>('/api/temp').subscribe(
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


//                                                        
//                                    bbbbbbbb            
//                                    b::::::b            
//                                    b::::::b            
//                                    b::::::b            
//                                     b:::::b            
//      ssssssssss   uuuuuu    uuuuuu  b:::::bbbbbbbbb    
//    ss::::::::::s  u::::u    u::::u  b::::::::::::::bb  
//  ss:::::::::::::s u::::u    u::::u  b::::::::::::::::b 
//  s::::::ssss:::::su::::u    u::::u  b:::::bbbbb:::::::b
//   s:::::s  ssssss u::::u    u::::u  b:::::b    b::::::b
//     s::::::s      u::::u    u::::u  b:::::b     b:::::b
//        s::::::s   u::::u    u::::u  b:::::b     b:::::b
//  ssssss   s:::::s u:::::uuuu:::::u  b:::::b     b:::::b
//  s:::::ssss::::::su:::::::::::::::uub:::::bbbbbb::::::b
//  s::::::::::::::s  u:::::::::::::::ub::::::::::::::::b 
//   s:::::::::::ss    uu::::::::uu:::ub:::::::::::::::b  
//    sssssssssss        uuuuuuuu  uuuubbbbbbbbbbbbbbbb   
//                                                        
//                                                        
//                                                        
//                                                        
//                                                        
//                                                        
//                                                        

@Component({
  selector: 'tempWorkshopListItem',
  template: `
  <div fxLayout="column">
    <div fxLayout="row" class="tableBodyRow">
      <div fxFlex="0 0 16px"></div>

      <div fxFlex="1 0 10px" fxLayoutAlign="center center">
        <div fxFlex="0 0 5px"></div>
        <div fxFlex="1 0 auto" fxLayout="row" fxLayoutAlign="center center">
          <button mat-icon-button (click)="dropDown = true;" *ngIf="!dropDown"><mat-icon>arrow_drop_down</mat-icon></button>
          <button mat-icon-button (click)="dropDown = false;" *ngIf="dropDown"><mat-icon>arrow_drop_up</mat-icon></button>

          <div fxFlex="1 1 auto" fxLayoutAlign="center center">{{ item['WUname'] }}</div>
        </div>
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="1 0 10px" fxLayoutAlign="center center">
        <div fxFlex="0 0 5px"></div>
        0
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="1 0 10px" fxLayoutAlign="center center">
        <div fxFlex="0 0 5px"></div>
        {{ date }}
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="0 0 16px"></div>
    </div>
    <div fxLayout="column" fxFlex="0 0 auto" *ngIf="dropDown" class="tableBodyRow">
      <div fxFlex="0 0 5px"></div>

      <div fxLayout="row" fxFlex="0 0 auto">
        <div fxFlex="0 0 16px"></div>
          Description: {{ item['WUdescription'] }}
        <div fxFlex="0 0 16px"></div>
      </div>

      <div fxFlex="0 0 5px"></div>
    </div>
  </div>
  `
})
export class WorkshopListComponent {
  private subArray: Subscription[] = [];

  private _item;
  @Input() set item(i: unit) {
    this._item = i;
    
    const date = i.WUpublished_date.split('T')[0].split('-');
    this.date = pad(date[1], 2) + "/" + pad(date[2], 2) + "/" + date[0]
  }
  get item() {
    return this._item;
  }

  public date: string = '';
  public dropDown: boolean = false;

  constructor(
    private api: ApiController
  ) {}

  public ngOnInit() {
    // this.getData();
  }

}
