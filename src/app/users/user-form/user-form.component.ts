import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { User } from './../../models/user';
import { UserArrayService } from './../services/user-array.service';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  user: User;
  originalUser: User;

  constructor(
    private userArrayService: UserArrayService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = new User(null, '', '');

    const id = +this.route.snapshot.paramMap.get('id');
    this.userArrayService.getUser(id)
      .then(user => {
        this.user = {...user};
        this.originalUser = {...user};
      })
      .catch(err => console.log(err));
  }

  ngOnDestroy(): void {
  }

  saveUser() {
    const user = {...this.user};

    if (user.id) {
      this.userArrayService.updateUser(user);
      // if success
      // this.originalUser = Object.assign({}, this.user);
      this.router.navigate(['/users', {id: user.id}]);
    } else {
      this.userArrayService.addUser(user);
      // if success
      // this.originalUser = Object.assign({}, this.user);
      this.goBack();
    }
    this.originalUser = {...this.user};
  }

  goBack() {
    this.router.navigate(['./../../'], {relativeTo: this.route});
  }
}
