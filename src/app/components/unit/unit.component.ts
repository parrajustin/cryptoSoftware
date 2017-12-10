import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Rx';

import { ApiController } from '../../services';
import { handleSub } from '../../util';
import { AddUnitDialogComponent } from './addDialog';

interface dialogResponse {
  'ip': string;
  'user': string;
  'pass': string;
}

interface unitArray {
  'WUdescription': string;
  'WUhost': string;
  'WUname': string;
  'WUpersistence_session': number;
  'WUpublished_date': string;
  'WUstatus': string;
}

@Component({
  selector: 'unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.less']
})
export class WorkshopUnitsComponent {
  private subArray: Subscription[] = [];
  public data: unitArray[] = []; 

  constructor(
    private api: ApiController,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.getData();
  }

  public getData() {
    const sub = this.api.get('/api/unit').subscribe(
      (value) => {
        this.data = (value) as unitArray[];
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
    const temp: MatDialogRef<AddUnitDialogComponent> = this.dialog.open(AddUnitDialogComponent, config);

    const sub = temp.afterClosed().subscribe(
      (value: dialogResponse) => {
        if (typeof value == 'object') {
          console.log(value);
          const httpSub = this.api.post('/api/unit/add', value).subscribe(
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
  selector: 'unitListItem',
  template: `
  <div fxLayout="column">
    <div fxLayout="row" class="tableBodyRow">
      <div fxFlex="0 0 16px"></div>

      <div fxFlex="0 0 auto" fxLayoutAlign="center center">
        <mat-checkbox></mat-checkbox>
      </div>

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
        {{ item['WUhost'] }}
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="1 0 10px" fxLayoutAlign="center center">
        <div fxFlex="0 0 5px"></div>
        {{ item['WUpersistence_session'] }}
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="1 0 10px" fxLayoutAlign="center center">
        <div fxFlex="0 0 5px"></div>
        {{ item['WUstatus'] }}
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

      <div fxFlex="0 0 15px"></div>

      <div fxLayout="row" fxFlex="0 0 auto">
        <div fxFlex="0 0 16px"></div>
        Virtual Machines:
        <div fxFlex="0 0 16px"></div>
      </div>

      <div fxFlex="0 0 5px"></div>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class UnitListComponent {
  @Input() public item;

  public dropDown: boolean = false;
}
