import { HeroisFacade } from './../../store/herois.facade';
import { Component, OnInit } from '@angular/core';
import { CRUDHeroisApi } from 'src/app/core/api/crud-herois.api';
import { combineLatest } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-herois',
  templateUrl: './lista-herois.component.html',
  styleUrls: ['./lista-herois.component.scss']
})
export class ListaHeroisComponent implements OnInit {
  colunas: string[] = ['Nome', 'Nome de Herói']
  readonly vm$ = combineLatest({
    herois: this.facade.herois$
  })

  constructor(
    private facade: HeroisFacade,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('chegou')
  }

  navegarParaInformacoes(heroiId: number){
    this.facade.selecionarHeroi(heroiId)
  }

  navegarParaCadastroDeHerois(){
    this.router.navigateByUrl('cadastro-heroi')
  }

}
