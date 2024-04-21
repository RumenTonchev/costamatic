import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MachinePageComponent} from "./pages/machine-page/machine-page.component";
import {AdminPageComponent} from "./pages/admin-page/admin-page.component";

const routes: Routes = [
  {
    path: '',
    component: MachinePageComponent
  }, {
    path: 'admin',
    component: AdminPageComponent
  }, {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
