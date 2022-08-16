import { IPaginaHTML } from "./shared/pagina.interface.js";

class Index implements IPaginaHTML{

  btnCadastrar: HTMLButtonElement;


  constructor() {
  
    this.configurarElementos();
  }
  
  
  public configurarElementos(): void {
    
    this.btnCadastrar = document.getElementById("btnCadastrar") as HTMLButtonElement;
    
    this.btnCadastrar.addEventListener("click", () =>{
      console.log("Clicado")
    });  
  }
}

new Index();