import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validators';
import { userNamePasswordValidator } from './username-password.validator';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ UserNotTakenValidatorService ]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private singupService: SignupService,
    private plataformDetectorService: PlatformDetectorService,
    private userNotTakenValidatorService: UserNotTakenValidatorService
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
    ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
    ],
      userName: ['',
        [
          Validators.required,
          // Validators.pattern(/^[a-z0-9_\-]+$/), Outra forma de fazer o validator é criando o nosso proprio.
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(30)
        ],
        // Adicionando um validador async
        this.userNotTakenValidatorService.checkUserNameTaken()
    ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14)
        ]
    ],
    }, {
      validator: userNamePasswordValidator
    });
    // tslint:disable-next-line:no-unused-expression
    this.plataformDetectorService.isPlatformBrowser() &&
    this.emailInput.nativeElement.focus();
  }

  singup() {
    if (this.signupForm.valid && !this.signupForm.pending) {
      const newUser = this.signupForm.getRawValue() as NewUser;
      this.singupService.singup(newUser)
      .subscribe(
        () => this.router.navigate(['']),
        err => console.log(err)
      );
    }
  }
}
