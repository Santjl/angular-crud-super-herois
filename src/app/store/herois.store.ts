import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Nullable<T> = T | null | undefined;

export type Herois = {
  id: number;
  nome: string;
  nomeHeroi: string;
  dataNascimento: any;
  altura: number;
  peso: number;
};

export type Superpoder = {
  id: number;
  superpoder: string;
  descricao: string;
};

export type HeroiSuperpoder = {
  id: number;
  nome: string;
  nomeHeroi: string;
  dataNascimento: any;
  altura: number;
  peso: number;
  superpoderes: Superpoder[];
};

export type HeroisState = {
  herois: Herois[];
  heroiSelecionado: Nullable<HeroiSuperpoder>;
};

const INITIAL_STATE: HeroisState = {
  herois: [],
  heroiSelecionado: null,
};

const HEROIS_STATE = 'herois_state';

@Injectable()
export class HeroisStore {
  private store: BehaviorSubject<HeroisState>;
  state$: Observable<HeroisState>;

  constructor() {
    const cachedState = this.getStorage();
    const initialState = cachedState || INITIAL_STATE ;

    this.store = new BehaviorSubject(initialState);
    this.state$ = this.store.asObservable();
  }

  setHerois(herois: Herois[]) {
    this.setState({ ...this.state, herois });
  }
  
  setHeroiSelecionado(heroiSelecionado: HeroiSuperpoder) {
      this.setState({ ...this.state, heroiSelecionado });
  }

  private setState(newState: HeroisState) {
    this.store.next(newState);
    this.setStorage(newState);
  }

  clear() {
    this.setState({ ...INITIAL_STATE });
  }

  private setStorage(state: HeroisState) {
    localStorage.setItem(HEROIS_STATE, JSON.stringify(state));
  }

  private getStorage() {
    return JSON.parse(localStorage.getItem(HEROIS_STATE) || 'null');
  }

  get state(): HeroisState {
    return this.store.getValue();
  }
}
