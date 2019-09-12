import {Component, OnInit} from '@angular/core';
import {DriverService} from '../services/driver.service';
import {AuthenticationService} from '../services/authenticate';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  driver: any = {address: '', name: '', id: ''};
  driverList: any = [];

  constructor(private driverService: DriverService, private authenticationService: AuthenticationService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.driverList = [];
    this.driverService.findAll(this.authenticationService.currentUserValue.id).subscribe(res => this.driverList = res);
  }

  saveDriver() {
    const userId = this.authenticationService.currentUserValue.id;
    if (this.driver.id) {
      this.driverService.updateDriver(this.driver, this.driver.id, userId).subscribe(rest => {
        if (rest) {
          this.toastr.success('Driver is successfully edited.');
          this.getAll();
        }
      });
    } else {
      this.driverService.createDriver(this.driver, userId).subscribe(rest => {
        if (rest) {
          this.toastr.success('Driver is successfully saved.');
          this.getAll();
        }
      });
    }

  }

  selectDriver(id: string) {
    this.driverList.map(item => {
      if (item.id === id) {
        this.driver = item;
      }
    });
  }

  openSave() {
    this.driver =  {address: '', name: '', id: ''};
  }
}
