import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {

  @Input() elementRef: any;

  constructor() {
  }

  ngOnInit() {
  }

  toogleBack() {
    this.elementRef.toggle();
  }
}
