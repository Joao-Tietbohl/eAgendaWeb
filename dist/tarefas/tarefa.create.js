import { Prioridade } from "./prioridade.enum.js";
import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";
class TarefaPaginaCadastro {
    constructor(repositorioTarefas, id) {
        this.repositorioTarefas = repositorioTarefas;
        this.configurarElementos();
        if (id) {
            this.idSelecionado = id;
            const tarefaSelecionada = this.repositorioTarefas.selecionarPorId(id);
            if (tarefaSelecionada)
                this.preencherFormulario(tarefaSelecionada);
        }
    }
    gravarRegistros() {
        const tarefa = this.obterDadosFormulario();
        if (!this.idSelecionado)
            this.repositorioTarefas.inserir(tarefa);
        else
            this.repositorioTarefas.editar(tarefa.id, tarefa);
        window.location.href = "tarefa.list.html";
    }
    configurarElementos() {
        this.txtDescricao = document.getElementById("txtDescricao");
        this.btnSalvar = document.getElementById("btnSalvar");
        this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros());
    }
    preencherFormulario(tarefaSelecionada) {
        this.txtDescricao.value = tarefaSelecionada.descricao;
        switch (tarefaSelecionada.prioridade) {
            case Prioridade.Baixa:
                this.rbdPrioridade = document.querySelector("input[value='Baixa']");
                break;
            case Prioridade.Media:
                this.rbdPrioridade = document.querySelector("input[value='Media']");
                break;
            case Prioridade.Alta:
                this.rbdPrioridade = document.querySelector("input[value='Alta']");
                break;
        }
        this.rbdPrioridade.checked = true;
    }
    obterDadosFormulario() {
        const descricao = this.txtDescricao.value;
        const prioridade = this.obterPrioridadeSelecionada();
        let tarefa = null;
        if (!this.idSelecionado)
            tarefa = new Tarefa(descricao, prioridade);
        else
            tarefa = new Tarefa(descricao, prioridade, this.idSelecionado);
        return tarefa;
    }
    obterPrioridadeSelecionada() {
        const rdbPrioridade = document.querySelector("input[type='radio']:checked");
        return rdbPrioridade.value;
    }
}
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
new TarefaPaginaCadastro(new TarefaRepositoryLocalStorage, id);
