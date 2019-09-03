import {Component, OnInit} from '@angular/core';
import {TestProjectService} from '../services/test-project.service';
import {AuthenticationService} from '../services/authenticate';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-test-project',
  templateUrl: './test-project.component.html',
  styleUrls: ['./test-project.component.scss']
})
export class TestProjectComponent implements OnInit {

  projects: any;
  userList: any;
  source: any;
  selectedProjectId: string;
  selectedProject: any;

  constructor(private testProjectService: TestProjectService,
              private authService: AuthenticationService, private userService: UserService) {
  }

  ngOnInit() {
    this.testProjectService.findAll(this.authService.currentUserValue.id).subscribe(res => {
      this.projects = res;
    });
  }

  show(id: string) {
    this.selectedProjectId = id;
    const selectedProject = this.projects.filter(item => item.id === id);
    if (selectedProject && selectedProject[0]) {
      this.userList = selectedProject[0].users;
      this.userService.findAllUsersByCompany(this.authService.currentUserValue.companyId, 0, 2000).subscribe(user => {
        if (user.content.length > 0) {
          this.userList.forEach(item => {
            if (item) {
              this.source = user.content.filter(filter => filter.id !== item.id);

            }
          });
        }
      });
    }
  }

  addUserToProject($event: any) {
    if ($event.items.length > 0) {
      const user = $event.items[0];
      const selectedProject = this.projects.filter(filtered => filtered.id === this.selectedProjectId);
      this.testProjectService.addAndRemove(selectedProject[0], this.authService.currentUserValue.id, [user.id], []).subscribe();
    }
  }

  removeUserToProject($event: any) {
    if ($event.items.length > 0) {
      const user = $event.items[0];
      const selectedProject = this.projects.filter(filtered => filtered.id === this.selectedProjectId);
      this.testProjectService.addAndRemove(selectedProject[0], this.authService.currentUserValue.id, [], [user.id]).subscribe();
    }
  }
}
