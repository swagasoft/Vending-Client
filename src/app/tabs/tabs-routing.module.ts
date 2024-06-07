import { ManageCurrencyComponent } from './../components/manage-currency/manage-currency.component';
import { ManagersComponent } from './../components/managers/managers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '../components/users/users.component';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'managers',
        component: ManagersComponent
      },

      {
        path: 'currency',
        component: ManageCurrencyComponent
      },

      {
        path: '',
        redirectTo: '/tabs/users',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
