import { Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookShowComponent } from './book-show/book-show.component';

export const bookRoutes: Routes = [
  {
    path: '',   
    component: BookComponent,
  },
  {
    path: 'create',
    component: BookCreateComponent,
  },
  {
    path: 'edit/:id',
    component: BookEditComponent,
  },
  {
    path: 'show/:id',
    component: BookShowComponent,
  }
];
