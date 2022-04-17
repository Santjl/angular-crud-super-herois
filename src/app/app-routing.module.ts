
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroHeroiComponent } from './pages/cadastro-heroi/cadastro-heroi.component';
import { ListaHeroisComponent } from './pages/lista-herois/lista-herois.component';
import { InformacoesHeroiComponent } from './pages/informacoes-heroi/informacoes-heroi.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cadastro-heroi',
    component: CadastroHeroiComponent
  },
  {
    path: 'lista-heroi',
    component: ListaHeroisComponent
  },
  {
    path: 'informacao-heroi/:id',
    component: InformacoesHeroiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
