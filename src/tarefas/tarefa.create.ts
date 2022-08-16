import { IPaginaFormulario } from "../shared/pagina.create.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/Repositorio.interface.js";
import { Prioridade } from "./prioridade.enum.js";
import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";

class TarefaPaginaCadastro implements IPaginaHTML, IPaginaFormulario {
 
  private txtDescricao: HTMLInputElement;
  private btnSalvar: HTMLButtonElement;
  private rbdPrioridade: HTMLInputElement;

  constructor(private repositorioTarefas: IRepositorio<Tarefa>) {
    this.configurarElementos();
  }

  gravarRegistros(): void {
    this.rbdPrioridade = document.querySelector('input[type="radio"]:checked') as HTMLInputElement;

    const prioridade = this.rbdPrioridade.value as Prioridade;

    const novaTarefa = new Tarefa(this.txtDescricao.value, prioridade);

    this.repositorioTarefas.inserir(novaTarefa);

    window.location.href = "tarefa.list.html";
  }
  
  configurarElementos(): void {
    this.txtDescricao = document.getElementById("txtDescricao") as HTMLInputElement;
    this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

    this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros())
  }

}

new TarefaPaginaCadastro(new TarefaRepositoryLocalStorage);