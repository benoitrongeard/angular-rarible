import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './screens/admin-page/admin-page.component';
import { ExploreNftPageComponent } from './screens/explore-nft-page/explore-nft-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ExploreNftPageComponent,
  },
  {
    path: 'admin',
    pathMatch: 'full',
    component: AdminPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
