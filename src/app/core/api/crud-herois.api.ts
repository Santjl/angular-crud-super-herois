import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

@Injectable()
export class CRUDHeroisApi extends BaseApi{
    constructor(http: HttpClient){
        super(http)
    }

    ObterHerois() : Observable<HeroiDTO[]>{
        return this.getAll('Herois/BuscarHerois')
    }
}