import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { MainComponent } from './Components/mainContent/mainContent.component';
import { TransferComponent } from './Components/transfer/transfer.component';
import { AuthGuard } from './auth.guard';
import { MenuComponent } from './Components/menu/menu.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'Components',
    canActivate: [AuthGuard],
    children: [
      { path: 'menu', component: MenuComponent }, // Display MenuComponent for menu route
      { path: 'mainContent', component: MainComponent }, // Display MainComponent
      { path: 'transfer', component: TransferComponent }, // Display Transfer 
    ],
  },
  // Add a default route for unauthenticated users (can be an empty component)
  { path: 'default', component: LoginComponent },
  { path: '**', redirectTo: 'default' }, // Handle any other invalid routes by redirecting to 'default'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
