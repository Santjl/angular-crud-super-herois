import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export type Card = {
  titulo: string,
  descricao: string,
  function: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

cards: Card[] = [{
  titulo: 'Lista de Heróis',
  descricao: 'Visualize todos os heróis existentes na sua região.',
  function: 'lista-heroi'

},
{
  titulo: 'Cadastre um Herói',
  descricao: 'Realize o cadastro de um novo herói.',
  function: 'cadastro-heroi'
}];

  navegarParaLista(url: string){
    console.log('alo')
    this.router.navigateByUrl(url)
  }

  constructor(private router: Router ) {}

  ngOnInit(): void {
  }

}
