import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PhotosComponent } from './photos/photos.component';
import { PhotoListComponent } from './photo-list.component';
import { LoadButtonComponent } from './load-button/load-button.component';
import { FilterByDescription } from './filter-by-description.pipe';
import { PhotoModule } from '../photo/photo.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { SearchComponent } from './search/search.component';
import { DarkenOnHoverModule } from 'src/app/shared/directives/darken-on-hover/darken-on-hover.module';

@NgModule({
  declarations: [
    PhotosComponent,
    PhotoListComponent,
    LoadButtonComponent,

    // Pipes
    FilterByDescription,

    SearchComponent,
  ],
  imports: [
    PhotoModule,
    CommonModule,
    CardModule,

    DarkenOnHoverModule,
    RouterModule
  ]
})
export class PhotoListModule {

}
