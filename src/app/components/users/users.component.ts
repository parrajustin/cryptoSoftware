import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Rx';

import { ApiController } from '../../services';
import { handleSub } from '../../util';
import { AddUserDialogComponent } from './addDialog';

interface dialogResponse {
  'ip': string;
  'user': string;
  'pass': string;
}

interface user {
  'email': string;
  'first_name': string;
  'last_name': string;
  'organization': string;
  'skill_level': number;
  'is_admin': boolean;
}

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  private subArray: Subscription[] = [];
  public data: user[] = [];
  private selected: string[] = [];

  constructor(
    private api: ApiController,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.getData();
  }

  public getData() {
    const sub = this.api.get('/api/user').subscribe(
      (value) => {
        console.log(value);
        this.data = (value) as user[];
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
    const temp: MatDialogRef<AddUserDialogComponent> = this.dialog.open(AddUserDialogComponent, config);

    const sub = temp.afterClosed().subscribe(
      (value: dialogResponse) => {
        if (typeof value == 'object') {
          const httpSub = this.api.post('/api/user/register', value).subscribe(
            (value) => {
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
    const len = this.selected.length;
    for (let i = 0; i < len; i++) {
      const httpSub = this.api.post('/api/user/remove', { user: this.selected[i]}).subscribe(
        (value) => {
          this.getData();
        }
      );
      this.subArray.push(httpSub);
    }
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
  selector: 'userListItem',
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

          <div fxFlex="1 1 auto" fxLayoutAlign="center center">{{ item['first_name'] }}</div>
        </div>
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="1 0 10px" fxLayoutAlign="center center">
        <div fxFlex="0 0 5px"></div>
        {{ item['last_name'] }}
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="1 0 10px" fxLayoutAlign="center center">
        <div fxFlex="0 0 5px"></div>
        {{ item['organization'] }}
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="0 0 16px"></div>
    </div>
    <div fxLayout="column" fxFlex="0 0 auto" *ngIf="dropDown" class="tableBodyRow">
      <div fxFlex="0 0 5px"></div>

      <div fxLayout="row" fxFlex="0 0 auto">
        <div fxFlex="0 0 16px"></div>
        Email Address: {{ item['email'] }}
        <div fxFlex="0 0 16px"></div>
      </div>

      <div fxFlex="0 0 15px"></div>

      <div fxLayout="row" fxFlex="0 0 auto">
        <div fxFlex="0 0 16px"></div>
        Skill Level: {{ item['skill_level'] }}
        <div fxFlex="0 0 16px"></div>
      </div>

      <div fxFlex="0 0 15px"></div>

      <div fxLayout="row" fxFlex="0 0 auto">
        <div fxFlex="0 0 16px"></div>
        Is an Admin: {{ item['is_admin'] }}
        <div fxFlex="0 0 16px"></div>
      </div>

      <div fxFlex="0 0 5px"></div>
    </div>
  </div>
  `
})
export class UserListComponent {
  @Input() public item: user;
  @Output() public deleteEvent: EventEmitter<{ key: string; add: boolean }> = new EventEmitter();

  public dropDown: boolean = false;

  public changeCheck(event) {
    this.deleteEvent.emit({ key: this.item.email, add: event['checked'] });
  }
}
