import {Component, OnDestroy, OnInit} from '@angular/core';
import {ManipulateServiceService} from '../services/manipulate-service.service';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {ReceiveMessageComponent} from '../dialogs/receive-message/receive-message.component';
import {DefaultResource} from '../models/default-resource';

@Component({
  selector: 'app-root',
  templateUrl: './manipulate-driver.component.html',
  styleUrls: ['./manipulate-driver.component.scss']
})
export class ManipulateDriverComponent implements OnInit, OnDestroy {
  elementActions: ElementAction[] = [];
  elementDatasource: MatTableDataSource<ElementAction>;
  selection = new SelectionModel<ElementAction>(false, []);
  displayedColumns = ['select', 'position', 'selectionType', 'selectionValue', 'selectedElement', 'result', 'actions'];
  navigateUrl: string;
  selectionValue: string;
  selectionType: string;
  sessionId: string;
  dialogRef: MatDialogRef<ManipulateDriverComponent>;
  selectedElement: ElementAction;
  message: string;
  enableElementSelectionTab: boolean = false;

  constructor(private manipulateservice: ManipulateServiceService, public dialog: MatDialog) {
    this.elementDatasource = new MatTableDataSource<ElementAction>(this.elementActions);
  }

  ngOnInit(): void {
  }

  getSession() {
    this.manipulateservice.getSession().subscribe(session => {
      this.sessionId = session.sessionId;
    });
  }

  navigateToUrl() {
    this.manipulateservice.navigateToUrl(this.navigateUrl, this.sessionId).subscribe(item => {
      this.enableElementSelectionTab = true;
    });
  }

  addElementAction() {
    this.elementActions.push({
      position: this.elementActions.length,
      selectionType: this.selectionType,
      selectionValue: this.selectionValue,
      selectedElementId: '',
      message: '',
      result: null,
      clickable: false
    });
    this.elementDatasource = new MatTableDataSource(this.elementActions);
  }

  selectLabel(row?: ElementAction): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  findElementBy(element: ElementAction) {
    this.manipulateservice.findElementBy(element.selectionType, element.selectionValue, this.sessionId)
      .subscribe((item: any) => element.selectedElementId = item.value.ELEMENT);
  }

  ngOnDestroy(): void {
    this.manipulateservice.killSession(this.sessionId).subscribe();
  }

  sendKeysElement(element: ElementAction, message: string) {
    // this.manipulateservice.sendKeysElement(this.sessionId, element.selectedElementId, message)
    //   .subscribe(item => {
    //     this.selectedElement = null, this.message = null;
    //   });
  }

  clickElement(element: ElementAction) {
    element.clickable = true;
    // this.manipulateservice.clickElement(this.sessionId, element.selectedElementId).subscribe();
  }

  removeRow(element) {
    const index = this.elementActions.indexOf(element)
    this.elementActions.splice(index, 1);
    this.elementDatasource = new MatTableDataSource(this.elementActions);
  }

  openDialog(element: ElementAction) {
    this.selectedElement = element;
    const dialogRef = this.dialog.open(ReceiveMessageComponent, {
      width: '250px',
      data: {element, message: this.message}
    });

    dialogRef.afterClosed().subscribe(result => {
      element.clickable = false;
      element.message = result.message;
      // this.sendKeysElement(result.element, result.message);
    });
  }

  runTest() {
    this.elementActions.forEach(element => {
      if (element.clickable) {
        this.manipulateservice.clickElement(this.sessionId, element.selectedElementId).subscribe(res => {
          element.result = res;
        });
      } else if (element.message) {
        this.manipulateservice.sendKeysElement(this.sessionId, element.selectedElementId, element.message)
          .subscribe(res => {
            element.result = res;
          });
      }
      setTimeout(() => {
        console.log('waiting browser to operate');
      }, 1000);
    });
  }
}

export interface ElementAction {
  position: number;
  selectionValue: string;
  selectionType: string;
  selectedElementId: string;
  clickable: boolean;
  message: string;
  result: DefaultResource;
}
