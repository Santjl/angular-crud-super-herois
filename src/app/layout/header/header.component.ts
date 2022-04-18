import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  navegarParaHome(){
    this.router.navigateByUrl('');
  }
 
  navegarParaListaHerois(){
    this.router.navigateByUrl('lista-heroi');
  }
  
  navegarParaCadastro(){
    this.router.navigateByUrl('cadastro-heroi');
  }
  ngOnInit(): void {
  }

}
