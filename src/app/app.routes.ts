import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/book/book.routes').then(m => m.bookRoutes)
    }
];
