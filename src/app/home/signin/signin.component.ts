import { Router, ActivatedRoute } from '@angular/router';
import {
  OnInit,
  Component,
  ViewChild,
  ElementRef,
} from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signin.component.html',
  styles: []
})
export class SigninComponent implements OnInit {

  fromUrl: string;
  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private platformeDetectorService: PlatformDetectorService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.fromUrl = params['fromUrl'];
      });
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    // tslint:disable-next-line:no-unused-expression
    this.platformeDetectorService.isPlatformBrowser() &&
    this.userNameInput.nativeElement.focus();
  }

  login() {
    console.log('vai autenticar');
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;
    this.authService
      .authenticate(userName, password)
      .subscribe(() => {
        this.fromUrl
        ? this.router.navigateByUrl(this.fromUrl)
        : this.router.navigate(['user', userName]);
      },
      err => {
        console.log(err);
        this.loginForm.reset();
        // tslint:disable-next-line:no-unused-expression
        this.platformeDetectorService.isPlatformBrowser() &&
        this.userNameInput.nativeElement.focus();
        alert('O usuário ou senha são invalidos');
      });
  }
}
