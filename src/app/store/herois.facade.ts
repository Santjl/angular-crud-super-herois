import { BehaviorSubject, switchMap, combineLatest, tap } from 'rxjs';
import { Herois, HeroisStore } from './herois.store';
import { Injectable } from "@angular/core";
import { CRUDHeroisApi } from '../core/api/crud-herois.api';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class HeroisFacade {
    public get store(): HeroisStore {
        return this._store;
    }
    public set store(value: HeroisStore){
        this._store = value;
    }

    // herois$ = this.store.state$.pipe(map((state) => state.herois));
    // superpoderes$ = this.store.state$.pipe(map((state) => state.superpoderes));

    triggerSuperpoderes$ = new BehaviorSubject({});

    triggerHerois$ = new BehaviorSubject({});

            

    selecionarHeroi(id: number) {
        console.log(id)
        this.router.navigate([
          'informacao-heroi',
          id
        ]);
      }

    idHeroi$ = new BehaviorSubject(0)

    herois$ = this.triggerHerois$.pipe(
        switchMap((trigger) => this.api.ObterHerois()),
        tap((data) => {
            if(data.length != 0 ){
                this.store.setHerois(data)
            }
        })
    );

    atualizarHerois(){
        this.triggerHerois$.next({});
    }

    private carregarHerois(){
        this.api.ObterHerois().subscribe({
            next: (data) => {
                if(data.length != 0 || data != null ){
                    this.store.setHerois(data)
                }
            }
        })
    }

    atualizaHeroiSelecionado(id: number){
        this.idHeroi$.next(id)
    }

    heroiSelecionado$ = this.idHeroi$.pipe(
        switchMap((heroi) => 
        this.api.obterDetalhesHeroi(heroi)
        ),
        tap((dado) => console.log(dado)),
        tap((dado) => this.store.setHeroiSelecionado(dado.data))
    );

    atualizarSuperpoderes(){
        this.triggerSuperpoderes$.next({});
    }

    superpoderes$ = this.triggerSuperpoderes$.pipe(
        switchMap((trigger) => this.api.obterSuperpoderes()),
        tap((data) => {
            if(data.data.length != 0 || data.success == true ){
                this.store.setSuperpoderes(data.data)
            }
        })
    );

    constructor(
        private api: CRUDHeroisApi,
        private _store: HeroisStore,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ){
        this.carregarHerois();
    }
}