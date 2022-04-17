import { Router, ActivatedRoute } from '@angular/router';
import { Herois } from './../../store/herois.store';
import { HeroisFacade } from './../../store/herois.facade';
import { Component, OnInit } from '@angular/core';
import { combineLatestInit } from 'rxjs/internal/observable/combineLatest';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-informacoes-heroi',
  templateUrl: './informacoes-heroi.component.html',
  styleUrls: ['./informacoes-heroi.component.scss']
})
export class InformacoesHeroiComponent implements OnInit {

  readonly vm$ = combineLatest({
    heroi: this.facade.heroiSelecionado$,
    idHeroi: this.facade.idHeroi$
  })
  activatedRoute: any;

  constructor(
    private facade: HeroisFacade,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      var id = params.get('id');

      if(id) this.facade.atualizaHeroiSelecionado(parseInt(id))

    });
  }
  

}
