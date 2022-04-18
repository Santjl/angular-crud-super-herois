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

    obterDetalhesHeroi(
        heroiId: number
    ) : Observable<{success: boolean, data: HeroiSuperpoderDTO}>{
        console.log(heroiId)
        let params = new HttpParams()
        .set('heroiId', heroiId)
        return this.getWithParams('HeroisSuperpoderes/BuscarHeroiSuperpoderes', params)
    }

    deletarSuperHeroi(
        heroiId: number
    ) : Observable<any> {
        let params = new HttpParams()
        .set('heroiId', heroiId)
        return this.http.delete('https://localhost:44303/api/HeroisSuperpoderes/ExcluirHeroiSuperpoderes', {
            params: params
        });
        // return this.getWithParams('HeroisSuperpoderes/BuscarHeroiSuperpoderes', params)

    }

    obterSuperpoderes() : Observable<{success: boolean, data: SuperpoderDTO[]}>{
        return this.getAll('Superpoder/BuscarSuperpoderes')
    }

    cadastrarSuperpoder(
        superpoder: string,
        descricao: string
    ) : Observable<any>{
        return this.post('Superpoder/AdicionarSuperpoder', {
            'superpoder': superpoder,
            'descricao': descricao
        })
    }

    cadastrarHeroiSuperpoder(
        nome: string,
        nomeHeroi: string,
        dataNascimento: Date,
        altura: number,
        peso: number,
        superpoderes: {
            superpoder: string,
            descricao: string
        }[],

        
    ) : Observable<any>{
        return this.post('HeroisSuperpoderes/AdicionarHeroiSuperpoderes', {
            "nome": nome,
            "nomeHeroi": nomeHeroi,
            "dataNascimento": dataNascimento,
            "altura": altura,
            "peso": peso,
            "superpoderes": superpoderes
        })
    }
    
    atualizarHeroiSuperpoder(
        heroiId: number,
        nome: string,
        nomeHeroi: string,
        dataNascimento: Date,
        altura: number,
        peso: number,
        superpoderes: {
            superpoder: string,
            descricao: string
        }[],

        
    ) : Observable<any>{
        return this.put('HeroisSuperpoderes/AtualizarHeroiSuperpoderes', {
            "Id": heroiId,
            "nome": nome,
            "nomeHeroi": nomeHeroi,
            "dataNascimento": dataNascimento,
            "altura": altura,
            "peso": peso,
            "superpoderes": superpoderes
        })
    }

    
}