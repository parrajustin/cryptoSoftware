import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Rx';

import { ApiController } from '../../services';
import { handleSub } from '../../util';
import { AddDialogComponent } from './addDialog';
import { DialogComponent } from '../dialog';

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
  selector: 'server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.less']
})
export class ServerComponent implements OnDestroy, OnInit {
  private subArray: Subscription[] = [];
  public servers: serverArray[] = []; 
  private selected: string[] = [];

  constructor(
    private api: ApiController,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.getData();
  }

  public getData() {
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
    const temp: MatDialogRef<AddDialogComponent> = this.dialog.open(AddDialogComponent, config);

    const sub = temp.afterClosed().subscribe(
      (value: dialogResponse) => {
        if (typeof value == 'object') {
          const httpSub = this.api.post('/api/server/add', value).subscribe(
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
    if (this.selected.length == 0) {
      return;
    }
    
    const config = {
      width: `auto`,
      height: `auto`,
      panelClass: 'u-remove-padding-dialog',
      data: { 'options': ['yes', 'no'], 'message': 'Are you sure you want to delete these users?'},
      disableClose: true
    };
    const temp: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent, config);

    const sub = temp.afterClosed().subscribe(
      (value: dialogResponse) => {
        if (typeof value == 'string' && value === 'yes') {
          const len = this.selected.length;
          for (let i = 0; i < len; i++) {
            const httpSub = this.api.post('/api/server/remove', { server: this.selected[i]}).subscribe(
              (value) => {
                this.getData();
              }
            );
            this.subArray.push(httpSub);
          }
        }
      }
    );

    this.subArray.push(sub);
  }

  public deleteEvent(event) {
    if (event['add']) {
      this.selected.push(event['key']);
    } else {
      const index = this.selected.indexOf(event['key']);
      if (index != -1) {
        this.selected.splice(index, 1);
      }
    }
    console.log(this.selected);
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
  selector: 'serverListItem',
  template: `
  <div fxLayout="row" class="tableBodyRow">
    <div fxFlex="0 0 16px"></div>

    <div fxFlex="0 0 auto" fxLayoutAlign="start center">
      <mat-checkbox (change)="changeCheck($event)"></mat-checkbox>
    </div>

    <div fxFlex="1 1 auto" fxLayoutAlign="start center">
      <div fxFlex="0 0 5px"></div>
      {{ item['ip_address'] }}
      <div fxFlex="0 0 5px"></div>
    </div>

    <div fxFlex="1 1 auto" fxLayoutAlign="end center">
      <div fxFlex="0 0 5px"></div>
      {{ item['status'] }}
      <div fxFlex="0 0 5px"></div>
    </div>

    <div fxFlex="0 0 16px"></div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ServerListComponent {
  @Input() public item;
  @Output() public deleteEvent: EventEmitter<{ key: string; add: boolean }> = new EventEmitter();
  
  public changeCheck(event) {
    this.deleteEvent.emit({ key: this.item['ip_address'], add: event['checked'] });
  }
}
