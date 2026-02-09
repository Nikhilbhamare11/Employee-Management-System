import { Routes } from '@angular/router';
import { Employs } from './employs/employs';
import { About } from './about/about';
import { Update } from './update/update';
import { Search } from './search/search';

export const routes: Routes = [
    { path: '', component: Employs },
    { path: 'add', component: Employs },
    { path: 'search', component: Search },
    { path: 'about', component: About },
    { path: 'update', component: Update },
    { path: 'delete', component: Update },
];
