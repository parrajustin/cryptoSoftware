import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Rx';

import { ApiController } from '../../services';
import { handleSub } from '../../util';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { CloneDialogComponent } from './cloneDialog';

interface vm {
  'VMUID': string;
  'VMhost_server': string;
  'VMname': string;
  'VMrecent_snapshot': string;
  'VMvrdp': number;
}

interface vm_adapters {
  'VMUID': string;
  'c': string;
}

@Component({
  selector: 'virtualmachines',
  templateUrl: './virtualmachines.component.html',
  styleUrls: ['./virtualmachines.component.less']
})
export class VirtualMachinesComponent {
  private subArray: Subscription[] = [];
  private data: vm[] = [];
  private selected: string[] = [];

  constructor(
    private api: ApiController,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.getData();
  }

  public onClickClone() {
    if (this.selected.length === 0) {
      return;
    }

    const config = {
      width: `auto`,
      height: `auto`,
      panelClass: 'u-remove-padding-dialog',
      data: this.selected,
      disableClose: true
    };
    const temp: MatDialogRef<CloneDialogComponent> = this.dialog.open(CloneDialogComponent, config);

    const sub = temp.afterClosed().subscribe(
      (value) => {
        if (value.length > 0) {
          console.log(value);
          const httpSub = this.api.post('/api/vm/clone', value).subscribe(
            (value) => {
              console.log(value);
              // this.getData();
            }
          );
          this.subArray.push(httpSub);
        }
      }
    );

    this.subArray.push(sub);
  }

  public getData() {
    const sub = this.api.get('/api/vm').subscribe(
      (value) => {
        console.log(value);
        this.data = (value) as vm[];
      }
    );

    this.subArray.push(sub);
  }

  public selectEvent(event) {
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
  selector: 'vmListItem',
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
          <div fxFlex="1 1 auto" fxLayoutAlign="center center">{{ item['VMname'] }}</div>
        </div>
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="1 0 10px" fxLayoutAlign="center center">
        <div fxFlex="0 0 5px"></div>
        {{ item['VMvrdp'] }}
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="1 0 10px" fxLayoutAlign="center center">
        <div fxFlex="0 0 5px"></div>
        {{ data }}
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="1 0 10px" fxLayoutAlign="center center">
        <div fxFlex="0 0 5px"></div>
        {{ item['VMrecent_snapshot'] }}
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="1 0 10px" fxLayoutAlign="center center" style="overflow-x: auto;">
        <div fxFlex="0 0 5px"></div>
        {{ item['VMhost_server'] }}
        <div fxFlex="0 0 5px"></div>
      </div>

      <div fxFlex="0 0 16px"></div>
    </div>
  `
})
export class VMListComponent implements OnInit {
  private subArray: Subscription[] = [];
  @Input() public item;
  @Output() public deleteEvent: EventEmitter<{ key: string; add: boolean }> = new EventEmitter();
  public snapshots = '';
  public data = '';

  constructor(
    private api: ApiController
  ) {}

  public changeCheck(event) {
    this.deleteEvent.emit({ key: this.item['VMname'], add: event['checked'] });
  }

  public ngOnInit() {
    this.getData();
  }

  public getData() {
    const sub = this.api.get<vm_adapters[]>('/api/adapters/' + this.item['VMname']).subscribe(
      (value: vm_adapters[]) => {
        let val = '';
        const len = value.length;
        for (let i = 0; i < len - 1; i++) {
          this.data += value[i]['Network_Adapter'] + ", ";
        }
        this.data += value[len - 1]['Network_Adapter'];
      }
    );

    this.subArray.push(sub);
  }
}
