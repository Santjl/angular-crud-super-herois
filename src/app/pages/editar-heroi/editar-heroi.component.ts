import { CRUDHeroisApi } from 'src/app/core/api/crud-herois.api';
import { MatDialog } from '@angular/material/dialog';
import { HeroiSuperpoderDTO } from './../../core/api/crud-herois.api';
import { HeroisStore } from './../../store/herois.store';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { HeroisFacade } from './../../store/herois.facade';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Superpoder } from 'src/app/store/herois.store';
import { AdicionarSuperpoderComponent } from '../cadastro-heroi/components/adicionar-superpoder/adicionar-superpoder.component';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-editar-heroi',
  templateUrl: './editar-heroi.component.html',
  styleUrls: ['./editar-heroi.component.scss'],
})
export class EditarHeroiComponent implements OnInit {
  readonly vm$ = combineLatest({
    heroiSelecionado: this.facade.heroiSelecionado$,
    superpoderes: this.facade.superpoderes$,
  });

  id: number = 0;

  superpoderesHeroi: Superpoder[] = [];

  constructor(
    private facade: HeroisFacade,
    private route: ActivatedRoute,
    private store: HeroisStore,
    private dialog: MatDialog,
    private api: CRUDHeroisApi,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      var id = params.get('id');

      if (id) {
        this.facade.atualizaHeroiSelecionado(parseInt(id));
        this.id = parseInt(id);
      }
    });

    var stateHeroiSuperpoderes =
      this.store.state.heroiSelecionado?.superpoderes;
    if (stateHeroiSuperpoderes) this.superpoderesHeroi = stateHeroiSuperpoderes;
  }

  adicionarSuperpoder() {
    var superpoderes = this.formularioHeroi.get('superpoder')?.value;
    var superpoderesHeroi = this.superpoderesHeroi;
    if (superpoderesHeroi) {
      var listaFiltrada = superpoderesHeroi.filter(
        (x) => x.id == superpoderes.id
      );
      console.log('listaFiltrada', listaFiltrada);
      if (superpoderes != '') {
        if (listaFiltrada.length === 0) {
          superpoderesHeroi.push(superpoderes);
        } else {
          this.abrirDialogo('Atenção!', 'Superpoder já associado ao herói.')
        }
      }
    }
  }

  retirarSuperpoder(id: number) {
    var superpoderes = this.superpoderesHeroi;
    if (superpoderes) {
      var objIndex = superpoderes.findIndex((obj) => obj.id == id);
      superpoderes.splice(objIndex, 1);
    }
  }

  formularioHeroi = new FormGroup({
    nome: new FormControl('', [Validators.required, ]),
    nomeHeroi: new FormControl('', [Validators.required]),
    dataNascimento: new FormControl('', [Validators.required]),
    altura: new FormControl('', [Validators.required]),
    peso: new FormControl('', [Validators.required]),
    superpoder: new FormControl(''),
  });

  static numeroValidator(control: FormControl)
  {
    let regexpNumber = new RegExp('^[0-9]*$');
    if(!regexpNumber.test(control.value))
      return {numeroInvalido : true};
    return null;
  }

  cadastrarHeroiSuperpoderes(){
    console.log('entrou aqui')
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
          this.api.atualizarHeroiSuperpoder(
            this.id,
            nome,
            nomeHeroi,
            dataFormatada,
            parseFloat(altura),
            parseFloat(peso),
            this.superpoderesHeroi
          ).subscribe({
            next: (data) => {
              if (data.success === true){
                this.abrirDialogo('Sucesso!', 'Herói atualizado com sucesso.');
                this.facade.atualizarHerois();
                this.router.navigate(['informacao-heroi', this.id]);
              }
            },
            error: (e) => {
              if(e.error.errors[0]){
                this.abrirDialogo('Erro!',e.error.errors[0])
              } else {
                this.abrirDialogo('Erro!', 'Houve um erro ao atualizar o herói. Tente novamente.')
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

  abrirDialogo(titulo:string, mensagem: string){
    const dialogRef = this.dialog.open(DialogComponent)
    this.inserirDados(dialogRef.componentInstance, titulo, mensagem)
  }
  


  transformarDateType(data: string) {
    if(data.length == 8){
      var dia = data.substring(-1, 2);
      var mes = data.substring(2, 4);
      var ano = data.substring(4, 8);
      var date = `${ano}-${mes}-${dia}`;
      return new Date(date);
    } else {
      var dia = data.substring(-1, 2);
      var mes = data.substring(3, 5);
      var ano = data.substring(6, 10);
      var date = `${ano}-${mes}-${dia}`;
      console.log('date', date)
      return new Date(date);
    }
  }

  checarDataValida(data: string){
    if(data.length == 8){
      var dia = parseInt(data.substring(-1, 2));
      var mes = parseInt(data.substring(2, 4));
      var ano = parseInt(data.substring(4, 8));
      var date = `${ano}-${mes}-${dia}`;
      if(dia < 1 || dia > 31){
        return false;
      }
      if(mes < 1 || mes > 12){
        return false
      }
      return true
    } else {
      var dia = parseInt(data.substring(-1, 2));
      var mes = parseInt(data.substring(3, 5));
      var ano = parseInt(data.substring(6, 10));
      var date = `${ano}-${mes}-${dia}`;
      console.log('date', date)
      if(dia < 1 || dia > 31){
        return false;
      }
      if(mes < 1 || mes > 12){
        return false
      }
      return true
    }
  }

  abrirCadastroSuperpoder(){
    this.dialog.open(AdicionarSuperpoderComponent)
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formularioHeroi.controls[controlName].hasError(errorName);
  };
}