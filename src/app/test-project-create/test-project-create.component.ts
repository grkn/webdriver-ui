import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {TestProjectService} from '../services/test-project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../services/authenticate';

@Component({
  selector: 'app-test-project-create',
  templateUrl: './test-project-create.component.html',
  styleUrls: ['./test-project-create.component.scss']
})
export class TestProjectCreateComponent implements OnInit {

  project: any = {users: [], name: ''}
  event: any;
  source: any = [];

  constructor(private userService: UserService, private testProjectService: TestProjectService,
              private router: Router, private activeRoute: ActivatedRoute, private authService: AuthenticationService) {
    activeRoute.data.subscribe(item => {
      if (item && item.testProjectResolver) {
        this.project = item.testProjectResolver;
        this.userService.findAllUsersByCompany(this.authService.currentUserValue.companyId, 0, 2000).subscribe(res => {
          this.filterUser(res, item);
        });
      } else {
        this.userService.findAllUsersByCompany(this.authService.currentUserValue.companyId, 0, 2000).subscribe(res => {
          this.source = res.content;
        });
      }
    });
  }

  private filterUser(res, item) {
    res.content.forEach(content => {
      this.source = item.testProjectResolver.users.filter(user => user.id !== content.id);
    });
  }

  ngOnInit() {

  }


  saveProject() {
    this.testProjectService.create(this.project).subscribe(res => {
      this.router.navigate(['testproject']);
      this.authService.setProject(res);
      return res;
    });
  }
}
