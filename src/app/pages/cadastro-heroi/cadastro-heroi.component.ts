import { Router } from '@angular/router';
import { CRUDHeroisApi } from 'src/app/core/api/crud-herois.api';


import { DialogComponent } from './../../components/dialog/dialog.component';
import { Superpoder } from './../../store/herois.store';
import { HeroisFacade } from './../../store/herois.facade';
import { combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdicionarSuperpoderComponent } from './components/adicionar-superpoder/adicionar-superpoder.component';

@Component({
  selector: 'app-cadastro-heroi',
  templateUrl: './cadastro-heroi.component.html',
  styleUrls: ['./cadastro-heroi.component.scss'],
})
export class CadastroHeroiComponent implements OnInit {
  superpoderesHeroi: Superpoder[] = [
  ];
  readonly vm$ = combineLatest({
    superpoderes: this.facade.superpoderes$,
  });
  
  constructor(
    private facade: HeroisFacade,
    private dialog: MatDialog,
    private api: CRUDHeroisApi,
    private router: Router,
    private formBuilder: FormBuilder
    ) {}

  ngOnInit(): void {}

  adicionarSuperpoder() {
    console.log('alo')
    var superpoderes = this.formularioHeroi.get('superpoder')?.value
    var listaFiltrada = this.superpoderesHeroi.filter((x) => x.id == superpoderes.id );
    console.log('listaFiltrada', listaFiltrada)
    if(superpoderes != ''){
      if(listaFiltrada.length === 0 ){
        this.superpoderesHeroi.push(superpoderes)
      } else {
        this.abrirDialogo('Atenção!','Superpoder já adicionado ao herói.')
      }
    }
  }

  retirarSuperpoder(id: number){
    var superpoderes = this.superpoderesHeroi;
    var objIndex = superpoderes.findIndex((obj) => obj.id == id)
    superpoderes.splice(objIndex, 1)
  }


  formularioHeroi = this.formBuilder.group({
    nome: new FormControl('', [(Validators.required)]),
    nomeHeroi: new FormControl('', [(Validators.required)]),
    dataNascimento: new FormControl('', [Validators.required]),
    altura: new FormControl('', [(Validators.required)]),
    peso: new FormControl('', [(Validators.required)]),
    superpoder: new FormControl('',),
  });

  cadastrarHeroiSuperpoderes(){
    var nome = this.formularioHeroi.get('nome')?.value;
    var nomeHeroi = this.formularioHeroi.get('nomeHeroi')?.value;
    var dataNascimento = this.formularioHeroi.get('dataNascimento')?.value;
    var altura = this.formularioHeroi.get('altura')?.value;
    var peso = this.formularioHeroi.get('peso')?.value;
    var dataFormatada = this.transformarDateType(dataNascimento);
    if(!this.checarDataValida(dataNascimento)){
      this.abrirDialogo('Atenção!', 'Digite uma data válida.');
    } else {
      if(this.formularioHeroi.valid &&
        nome != '' &&
        nomeHeroi != '' &&
        dataNascimento != '' &&
        altura != '' &&
        peso != '' &&
        this.superpoderesHeroi.length > 0 
        ){
          this.api.cadastrarHeroiSuperpoder(
            nome,
            nomeHeroi,
            dataFormatada,
            parseFloat(altura),
            parseFloat(peso),
            this.superpoderesHeroi
          ).subscribe({
            next: (data) => {
              if (data.success === true){
                this.abrirDialogo('Sucesso!', 'Herói cadastrado com sucesso.');
                this.facade.atualizarHerois();
                this.router.navigateByUrl('lista-heroi');
              }
            },
            error: (e) => {
              console.log('e', e)
              if(e.error.errors[0]){
                this.abrirDialogo('Erro!', e.error.errors[0])
              }
              else{
                this.abrirDialogo('Erro!', 'Erro ao cadastrar o herói. Tente novamente.')
              }
            }
          })
        }
    }

  }

  private inserirDados(componentInstance: any, titulo: string, mensagem: string){
    if(componentInstance && titulo || mensagem){
      componentInstance.titulo = titulo,
      componentInstance.mensagem = mensagem
    }
  }

  abrirDialogo(titulo: string, mensagem: string){
    const dialogRef = this.dialog.open(DialogComponent)
    this.inserirDados(dialogRef.componentInstance, titulo, mensagem)
  }
  
  abrirCadastroSuperpoder(){
    this.dialog.open(AdicionarSuperpoderComponent)
  }

  transformarDateType(data: string){
    var dia = data.substring(-1,2);
    var mes = data.substring(2,4)
    var ano = data.substring(4,8)
    var date = `${ano}-${mes}-${dia}`
    return new Date(date);
  }

  checarDataValida(data: string){
    var dia = parseInt(data.substring(-1,2));
    var mes = parseInt(data.substring(2,4));
    var ano = parseInt(data.substring(4,8));
    if(dia < 1 || dia > 31){
      return false;
    }
    if(mes < 1 || mes > 12){
      return false
    }
    return true
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formularioHeroi.controls[controlName].hasError(errorName);
  };
}
