import { MatDialog } from '@angular/material/dialog';
import { CRUDHeroisApi } from './../../core/api/crud-herois.api';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Herois } from './../../store/herois.store';
import { HeroisFacade } from './../../store/herois.facade';
import { Component, OnInit } from '@angular/core';
import { combineLatestInit } from 'rxjs/internal/observable/combineLatest';
import { combineLatest, map } from 'rxjs';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

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

  id: number = 0

  constructor(
    private facade: HeroisFacade,
    private route: ActivatedRoute,
    private router: Router,
    private api: CRUDHeroisApi,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      var id = params.get('id');

      if(id) {
        this.facade.atualizaHeroiSelecionado(parseInt(id))
        this.id = parseInt(id);
      }
    });
  }

  navegarParaEdicao(){
    this.router.navigateByUrl(`informacao-heroi/${this.id}/editar-heroi`)
  }
  
  excluirRegistroHeroi(){
    console.log('opa')
    console.log('this.id', this.id)
    this.api.deletarSuperHeroi(this.id).subscribe(
    {
      next: (data) => {
        if(data.success == true){
          this.abrirDialogo('Sucesso!', 'Herói excluído com sucesso.');
          this.facade.atualizarHerois();
          this.router.navigateByUrl('lista-heroi')
        } 
      }, error: (e) => {
        if(e.error.errors[0]){
          this.abrirDialogo('Erro!',e.error.errors[0])
        } else {
          this.abrirDialogo('Erro!', 'Houve um erro ao excluir o registro do herói, tente novamente.')
        }
      }
    }
    );
  }



  private inserirDados(componentInstance: any, 
    titulo: string, 
    mensagem: string, 
    botaoConfirmar?: string, 
    botaoCancelar?: string, 
    click?: Function){
    if(componentInstance && titulo || mensagem){
      componentInstance.titulo = titulo,
      componentInstance.mensagem = mensagem,
      componentInstance.botaoConfirmar = botaoConfirmar,
      componentInstance.botaoCancelar = botaoCancelar,
      componentInstance.click = click
    }
  }
  abrirDialogo(titulo: string, mensagem: string){
    const dialogRef = this.dialog.open(DialogComponent)
    this.inserirDados(dialogRef.componentInstance, titulo, mensagem)
  }

  abrirConfirmacaoExclusao(){
    const dialogRef = this.dialog.open(DialogComponent)
    this.inserirDados(dialogRef.componentInstance, 
  'Excluir Herói', 
  'Tem certeza de que quer excluir o herói?',
  'Confirmar',
  'Cancelar',
  this.excluirRegistroHeroi,
  )
  }
}
