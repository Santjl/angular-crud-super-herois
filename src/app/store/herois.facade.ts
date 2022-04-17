import { BehaviorSubject, switchMap, combineLatest, tap } from 'rxjs';
import { HeroisStore } from './herois.store';
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

    herois$ = this.store.state$.pipe(map((state) => state.herois));

    // filtroHeroi$ = combineLatest({
    //     idHeroi: this.activatedRoute.paramMap.subscribe(params => {

    //         var id = params.get('id');
      
    //         this.facade.selecionarHeroi(id)
      
    //       })
    //     });
            

    selecionarHeroi(id: number) {
        console.log(id)
        this.router.navigate([
          'informacao-heroi',
          id
        ]);
      }

    idHeroi$ = new BehaviorSubject(0)

    private carregarHerois(){
        this.api.ObterHerois().subscribe({
            next: (data) => {
                if(data != [] || data != null ){
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
        this.api.ObterDetalhesHeroi(heroi)
        ),
        tap((dado) => console.log(dado)),
        tap((dado) => this.store.setHeroiSelecionado(dado.data))
    );

    constructor(
        private api: CRUDHeroisApi,
        private _store: HeroisStore,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ){
        this.carregarHerois()
    }
}