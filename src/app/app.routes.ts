import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ErrorComponent } from './pages/error/error.component';
import { SightingsComponent } from './pages/sightings/sightings.component';

export const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'sightings', component: SightingsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'auth', component: AuthComponent },


    { path: '404', component: ErrorComponent },
    { path: '**', redirectTo: '/404' },
];
