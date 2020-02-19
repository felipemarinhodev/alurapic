import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // $ usado para inidicar que é um obj do tipo Observable
  user$: Observable<User>;
  user: User;

  constructor(
    private userService: UserService,
    private router: Router
    ) {
    this.user$ = userService.getUser();
    this.user$.subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }
}
