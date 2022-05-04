interface Veiculo {
  nome: string,
  placa: string,
  entrada: Date,
}

(function() {

  const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

  function patio(){
    
    function ler(): Veiculo[] {
      return localStorage.patio ? JSON.parse(localStorage.patio) : [];
    }

    function salvar(veiculos: Veiculo[]){
      localStorage.setItem("patio", JSON.stringify(veiculos));
    }

    function adicionar(veiculo: Veiculo, save?: boolean){
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${veiculo.nome}</td>
        <td>${veiculo.placa}</td>
        <td>${veiculo.entrada}</td>
        <td><button class="delete" data-placa="${veiculo.placa}">X</button></td>
      `;

      $("#patio")?.appendChild(row);

      if(save){
        salvar([...ler(), veiculo]);
      }
    }
    
    function remover(){

    }

    function render(){
      $("#patio")!.innerHTML = '';
      const patio = ler();

      if(patio.length){
        patio.forEach((veiculo) => adicionar(veiculo));
      }

    }

    return { ler, adicionar, salvar, remover, render };
  }

  patio().render();

  $("#cadastrar")?.addEventListener("click", () => {
    const nome = $("#nome")?.value;
    const placa = $("#placa")?.value;
    // console.log(`Nome: ${nome} | Placa: ${placa}`);

    if(!nome || !placa){
      alert("Os campos são obrigatorios");
      return;
    }

    patio().adicionar({ nome, placa, entrada: new Date() }, true);
  
  });


})();