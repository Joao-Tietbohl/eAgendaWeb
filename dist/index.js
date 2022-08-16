class Index {
    constructor() {
        this.configurarElementos();
    }
    configurarElementos() {
        this.btnCadastrar = document.getElementById("btnCadastrar");
        this.btnCadastrar.addEventListener("click", () => {
            console.log("Clicado");
        });
    }
}
new Index();
export {};
