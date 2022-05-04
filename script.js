(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calcTempo(milisegundos) {
        const minutos = Math.floor(milisegundos / 60000);
        const segundos = Math.floor((milisegundos % 60000) / 1000);
        return `${minutos}m e ${segundos}s`;
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        function adicionar(veiculo, save) {
            var _a, _b;
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${veiculo.nome}</td>
        <td>${veiculo.placa}</td>
        <td>${veiculo.entrada}</td>
        <td><button class="delete" data-placa="${veiculo.placa}">X</button></td>
      `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.placa);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (save) {
                salvar([...ler(), veiculo]);
            }
        }
        function remover(placa) {
            const { nome, entrada } = ler().find(veiculo => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veiculo ${nome} permaneceu por ${tempo}.\n\nDeseja encerrar?`)) {
                return;
            }
            else {
                salvar(ler().filter((veiculo) => veiculo.placa !== placa));
                render();
            }
        }
        function render() {
            $("#patio").innerHTML = '';
            const patio = ler();
            if (patio.length) {
                patio.forEach((veiculo) => adicionar(veiculo));
            }
        }
        return { ler, adicionar, salvar, remover, render };
    }
    patio().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        // console.log(`Nome: ${nome} | Placa: ${placa}`);
        if (!nome || !placa) {
            alert("Os campos são obrigatorios");
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
})();
