import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Rx';

import { ApiController } from '../../services';
import { handleSub } from '../../util';
import { AddGroupDialogComponent } from './addDialog';

interface dialogResponse {
  'ip': string;
  'user': string;
  'pass': string;
}

interface groupArray {
  'WGname': string;
  'WGdescription': string;
  'WGhost': string;
  'WGpersistence_session': number;
  'WGpublished_date': string;
  'WGstatus': string;
}

interface guArray {
  'WUname': string;
  'WGname': string;
}

@Component({
  selector: 'group',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.less']
})
export class WorkshopGroupsComponent implements OnInit {
  private subArray: Subscription[] = [];
  public data: groupArray[] = [];
  private selectedGroups: groupArray[] = [];

  constructor(
    private api: ApiController,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.getData();
  }

  public getData() {
    const sub = this.api.get('/api/group').subscribe(
      (value) => {
        console.log(value);
        this.data = (value) as groupArray[];
      }
    );

    this.subArray.push(sub);
  }

  public openAdd() {
    const config = {
      width: `auto`,
      height: `auto`,
      panelClass: 'u-remove-padding-dialog',
      data: [],
      disableClose: false
    };
    const temp: MatDialogRef<AddGroupDialogComponent> = this.dialog.open(AddGroupDialogComponent, config);

    const sub = temp.afterClosed().subscribe(
      (value: dialogResponse) => {
        if (typeof value == 'object') {
          console.log(value);
          const httpSub = this.api.post('/api/group/add', value).subscribe(
            (value) => {
              console.log(value);
              this.getData();
            }
          );
          this.subArray.push(httpSub);
        }
      }
    );

    this.subArray.push(sub);
  }

  public onClickDelete() {
    const len = this.selectedGroups.length;
    for (let i = 0; i < len; i++) {
      console.log('deleting: ' +  this.selectedGroups[i]);
      const httpSub = this.api.post('/api/group/remove', { group: this.selectedGroups[i]}).subscribe(
        (value) => {
          console.log(value);
        }
      );
      this.subArray.push(httpSub);
    }
    this.getData();
  }

  public deleteEvent(event) {
    if (event['add']) {
      this.selectedGroups.push(event['key']);
    } else {
      const index = this.selectedGroups.indexOf(event['key']);
      if (index != -1) {
        this.selectedGroups.splice(index, 1);
      }
    }
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
  selector: 'groupListItem',
  template: `
  <div fxLayout="column">
    <div fxLayout="row" class="tableBodyRow">
      <div fxFlex="0 0 16px"></div>

      <div fxFlex="0 0 auto" fxLayoutAlign="center center">
        <mat-checkbox (change)="changeCheck($event)"></mat-checkbox>
      </div>

      <div fxFlex="1 0 10px" fxLayoutAlign="center center">
        <div fxFlex="0 0 5px"></div>
        <div fxFlex="1 0 auto" fxLayout="row" fxLayoutAlign="center center">
          <button mat-icon-button (click)="dropDown = true;" *ngIf="!dropDown"><mat-icon>arrow_drop_down</mat-icon></button>
          <button mat-icon-button (click)="dropDown = false;" *ngIf="dropDown"><mat-icon>arrow_drop_up</mat-icon></button>

          <div fxFlex="1 1 auto" fxLayoutAlign="center center">{{ item['WGname'] }}</div>
        </div>
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="1 0 10px" fxLayoutAlign="center center">
        <div fxFlex="0 0 5px"></div>
        {{ noWU }}
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="1 0 10px" fxLayoutAlign="center center">
        <div fxFlex="0 0 5px"></div>
        {{ item['WGhost'] }}
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="1 0 10px" fxLayoutAlign="center center">
        <div fxFlex="0 0 5px"></div>
        {{ item['WGstatus'] }}
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="0 0 16px"></div>
    </div>
    <div fxLayout="column" fxFlex="0 0 auto" *ngIf="dropDown" class="tableBodyRow">
      <div fxFlex="0 0 5px"></div>

      <div fxLayout="row" fxFlex="0 0 auto">
        <div fxFlex="0 0 16px"></div>
        Description: {{ item['WGdescription'] }}
        <div fxFlex="0 0 16px"></div>
      </div>

      <div fxFlex="0 0 15px"></div>

      <div fxLayout="row" fxFlex="0 0 auto">
        <div fxFlex="0 0 16px"></div>
        Workshop Units:
        <div fxFlex="0 0 16px"></div>
      </div>

      <div fxLayout="column" fxFlex="0 0 auto">
        <div fxLayout="row" fxFlex="0 0 auto" *ngFor="let unit of WUs">
          <div fxFlex="0 0 16px"></div>
          - {{ unit['WUname'] }}
          <div fxFlex="0 0 16px"></div>
        </div>
      </div>

      <div fxFlex="0 0 5px"></div>
    </div>
  </div>
  `
})
export class GroupListComponent {
  private subArray: Subscription[] = [];
  @Input() public item;
  @Output() public deleteEvent: EventEmitter<{ key: string; add: boolean }> = new EventEmitter();

  public dropDown: boolean = false;
  public noWU: number = 0;
  public WUs: guArray[] = [];

  constructor(
    private api: ApiController
  ) {}

  public ngOnInit() {
    this.getData();
  }

  public changeCheck(event) {
    this.deleteEvent.emit({ key: this.item['WGname'], add: event['checked'] });
  }

  public getData() {
    const sub = this.api.get<guArray[]>('/api/groupunit/' + this.item['WGname']).subscribe(
      (value: guArray[]) => {
        console.log(value);
        this.WUs = value;
        this.noWU = value.length;
        console.log(this.noWU);
        // this.data = (value) as groupArray[];
      }
    );

    this.subArray.push(sub);
  }
}
