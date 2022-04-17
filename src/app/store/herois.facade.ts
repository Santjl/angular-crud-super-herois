import { HeroisStore } from './herois.store';
import { Injectable } from "@angular/core";
import { CRUDHeroisApi } from '../core/api/crud-herois.api';
import { map } from 'rxjs';

@Injectable()
export class HeroisFacade {
    public get store(): HeroisStore {
        return this._store;
    }
    public set store(value: HeroisStore){
        this._store = value;
    }

    herois$ = this.store.state$.pipe(map((state) => state.herois));

    private carregarHerois(){
        this.api.ObterHerois().subscribe({
            next: (data) => {
                if(data != [] || data != null ){
                    this.store.setHerois(data)
                }
            }
        })
    }

    constructor(
        private api: CRUDHeroisApi,
        private _store: HeroisStore
    ){
        this.carregarHerois()
    }
}