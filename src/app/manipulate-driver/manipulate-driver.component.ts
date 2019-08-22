import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {ManipulateServiceService} from '../services/manipulate-service.service';
import {SessionIdResource} from '../models/session-id-resource';
import {AuthenticationService} from '../services/authenticate';

@Component({
  selector: 'app-root',
  templateUrl: './manipulate-driver.component.html',
  styleUrls: ['./manipulate-driver.component.scss']
})
export class ManipulateDriverComponent {
  title = 'Driver Manipulation';

  sessionResource: Observable<SessionIdResource>;

  constructor(private manipulateservice: ManipulateServiceService, private authenticateService: AuthenticationService) {
  }

  getSession() {
    this.sessionResource = this.manipulateservice.getSession();
  }
}
