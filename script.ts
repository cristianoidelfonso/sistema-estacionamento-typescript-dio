(function() {

  const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

  $("#cadastrar")?.addEventListener("click", () => {
    const nome = $("#nome")?.value;
    const placa = $("#placa")?.value;
    // console.log(`Nome: ${nome} | Placa: ${placa}`);

    if(!nome || !placa){
      alert("Os campos são obrigatorios");
      return;
    }

  });

})();