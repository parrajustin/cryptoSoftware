import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';

import { AddUnitDialogComponent } from './addDialog';
import { handleSub } from '../../util';
import { ApiController } from '../../services';

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
    const sub = this.api.get('/api/unit').subscribe(
      (value) => {
        this.data = (value) as unitArray[];
      }
    );

    this.subArray.push(sub);
  }

  public openAddServer() {
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
  <div fxLayout="row" class="tableBodyRow">
    <div fxFlex="0 0 16px"></div>

    <div fxFlex="0 0 auto" fxLayoutAlign="center center">
      <mat-checkbox></mat-checkbox>
    </div>

    <div fxFlex="1 0 10px" fxLayoutAlign="center center">
      <div fxFlex="0 0 5px"></div>
      {{ item['WUname'] }}
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class UnitListComponent {
  @Input() public item;
}
