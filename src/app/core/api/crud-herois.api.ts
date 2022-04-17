import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BaseApi } from "./base.api";

export type HeroiDTO = {
    id: number,
    nome: string,
    nomeHeroi: string,
    dataNascimento: any,
    altura: number,
    peso: number
}

export type SuperpoderDTO = {
    id: number;
    superpoder: string;
    descricao: string;
  };
  
  export type HeroiSuperpoderDTO = {
    id: number;
    nome: string;
    nomeHeroi: string;
    dataNascimento: any;
    altura: number;
    peso: number;
    superpoderes: SuperpoderDTO[];
  };

@Injectable()
export class CRUDHeroisApi extends BaseApi{
    constructor(http: HttpClient){
        super(http)
    }

    ObterHerois() : Observable<HeroiDTO[]>{
        return this.getAll('Herois/BuscarHerois')
    }

    ObterDetalhesHeroi(
        heroiId: number
    ) : Observable<{success: boolean, data: HeroiSuperpoderDTO}>{
        console.log(heroiId)
        let params = new HttpParams()
        .set('heroiId', heroiId)
        return this.getWithParams('HeroisSuperpoderes/BuscarHeroiSuperpoderes', params)
    }
}