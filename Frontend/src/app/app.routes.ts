import { Routes } from '@angular/router';
import { Employs } from './employs/employs';
import { About } from './about/about';
import { Update } from './update/update';
import { Search } from './search/search';
import { Employees } from './employees/employees';
import { Pagenf } from './pagenf/pagenf';

export const routes: Routes = [
    { path: '', component: Employs },
    { path: '**', component: Pagenf },
    { path: 'add', component: Employs },
    { path: 'search', component: Search },
    { path: 'about', component: About },
    { path: 'update', component: Update },
    { path: 'delete', component: Update },
    { path: 'emps', component: Employees }
];
