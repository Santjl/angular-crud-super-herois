import { HeroisStore } from './store/herois.store';
import { HeroisFacade } from './store/herois.facade';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from './layout/layout.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { CadastroHeroiComponent } from './pages/cadastro-heroi/cadastro-heroi.component';
import { ListaHeroisComponent } from './pages/lista-herois/lista-herois.component';
import { CRUDHeroisApi } from './core/api/crud-herois.api';
import { InformacoesHeroiComponent } from './pages/informacoes-heroi/informacoes-heroi.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastroHeroiComponent,
    ListaHeroisComponent,
    InformacoesHeroiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: 'BASE_URL', useValue: environment.baseUrl },
    HttpClientModule,
    CRUDHeroisApi,
    HeroisFacade,
    HeroisStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
