import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RequestInterceptor } from './auth/request.interceptor';
import { MenuModule } from '../shared/components/menu/menu.module';
import { AlertModule } from '../shared/components/alert/alert.module';
import { LoadingModule } from '../shared/components/loading/loading.module';
import { ShowIfLoggedModule } from '../shared/directives/show-if-logged/show-if-logged.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    MenuModule,
    AlertModule,
    LoadingModule,
    ShowIfLoggedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ]
})

export class CoreModule {}
