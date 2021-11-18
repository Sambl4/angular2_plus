import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { User } from './../../models/user';
import { UserArrayService } from './../services/user-array.service';
import { DialogService }  from './../../services/dialog.service';

import { Observable }    from 'rxjs/Observable';
// import { CanComponentDeactivate } from './../../interfaces/can-component-deactivate';


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
    private router: Router,
    private dialogService: DialogService
  ) { }


  ngOnInit(): void {
    this.user = new User(null, '', '');

    // const id = +this.route.snapshot.paramMap.get('id');
    // this.userArrayService.getUser(id)
    //   .then(user => {
    //     this.user = {...user};
    //     this.originalUser = {...user};
    //   })
    //   .catch(err => console.log(err));

    this.route.data.subscribe(data => {
      this.user = {...data.user};
      this.originalUser = {...data.user};
    });

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

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // const flags = Object.keys(this.originalUser).map(key => {
    //   if (this.originalUser[key] === this.user[key]) {
    //     return true;
    //   }
    //   return false;
    // });

    // if (flags.every(el => el)) {
    //   return true;
    // }

    if (!this.originalUser || this.originalUser.firstName === this.user.firstName) {
      return true;
    }

    return this.dialogService.confirm('Discard changes?');
}

}
