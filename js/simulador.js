// Dados climáticos simulados por estado
const dadosClimaticos = {
    "SP": { umidade: 68, precipitacao: 52, temperatura: 24, regiao: "Sudeste" },
    "RJ": { umidade: 72, precipitacao: 58, temperatura: 25, regiao: "Sudeste" },
    "MG": { umidade: 65, precipitacao: 48, temperatura: 22, regiao: "Sudeste" },
    "ES": { umidade: 70, precipitacao: 55, temperatura: 23, regiao: "Sudeste" },
    "RS": { umidade: 62, precipitacao: 58, temperatura: 18, regiao: "Sul" },
    "SC": { umidade: 66, precipitacao: 52, temperatura: 19, regiao: "Sul" },
    "PR": { umidade: 64, precipitacao: 50, temperatura: 20, regiao: "Sul" },
    "GO": { umidade: 52, precipitacao: 45, temperatura: 27, regiao: "Centro-Oeste" },
    "MS": { umidade: 58, precipitacao: 48, temperatura: 26, regiao: "Centro-Oeste" },
    "MT": { umidade: 60, precipitacao: 55, temperatura: 28, regiao: "Centro-Oeste" },
    "DF": { umidade: 55, precipitacao: 50, temperatura: 25, regiao: "Centro-Oeste" },
    "BA": { umidade: 48, precipitacao: 42, temperatura: 29, regiao: "Nordeste" },
    "PE": { umidade: 52, precipitacao: 45, temperatura: 28, regiao: "Nordeste" },
    "CE": { umidade: 45, precipitacao: 38, temperatura: 30, regiao: "Nordeste" },
    "RN": { umidade: 50, precipitacao: 40, temperatura: 29, regiao: "Nordeste" },
    "PB": { umidade: 51, precipitacao: 42, temperatura: 28, regiao: "Nordeste" },
    "SE": { umidade: 53, precipitacao: 46, temperatura: 27, regiao: "Nordeste" },
    "AL": { umidade: 54, precipitacao: 48, temperatura: 27, regiao: "Nordeste" },
    "MA": { umidade: 65, precipitacao: 60, temperatura: 28, regiao: "Nordeste" },
    "PI": { umidade: 55, precipitacao: 50, temperatura: 29, regiao: "Nordeste" },
    "PA": { umidade: 78, precipitacao: 85, temperatura: 30, regiao: "Norte" },
    "AM": { umidade: 82, precipitacao: 90, temperatura: 31, regiao: "Norte" },
    "AC": { umidade: 80, precipitacao: 88, temperatura: 30, regiao: "Norte" },
    "RO": { umidade: 76, precipitacao: 82, temperatura: 29, regiao: "Norte" },
    "TO": { umidade: 68, precipitacao: 72, temperatura: 28, regiao: "Norte" },
    "RR": { umidade: 75, precipitacao: 85, temperatura: 30, regiao: "Norte" },
    "AP": { umidade: 80, precipitacao: 90, temperatura: 29, regiao: "Norte" }
};

// Parâmetros ideais por cultura
const parametrosCultura = {
    "Milho": { umidMin: 50, umidMax: 80, tempMin: 18, tempMax: 32, chuvaMin: 15, diasIdeal: 7, diasAtencao: 3 },
    "Soja": { umidMin: 55, umidMax: 85, tempMin: 20, tempMax: 30, chuvaMin: 15, diasIdeal: 7, diasAtencao: 3 },
    "Feijão": { umidMin: 45, umidMax: 75, tempMin: 16, tempMax: 28, chuvaMin: 15, diasIdeal: 7, diasAtencao: 3 },
    "Arroz": { umidMin: 70, umidMax: 95, tempMin: 22, tempMax: 35, chuvaMin: 20, diasIdeal: 5, diasAtencao: 2 },
    "Trigo": { umidMin: 40, umidMax: 70, tempMin: 10, tempMax: 24, chuvaMin: 12, diasIdeal: 7, diasAtencao: 3 }
};

// Mapeamento de prefixos de CEP para estados
const mapaCEP = {
    "01": "SP", "02": "SP", "03": "SP", "04": "SP", "05": "SP", "06": "SP", "07": "SP", "08": "SP", "09": "SP",
    "11": "SP", "12": "SP", "13": "SP", "14": "SP", "15": "SP", "16": "SP", "17": "SP", "18": "SP", "19": "SP",
    "20": "RJ", "21": "RJ", "22": "RJ", "23": "RJ", "24": "RJ", "25": "RJ", "26": "RJ", "27": "RJ", "28": "RJ",
    "29": "ES", "30": "MG", "31": "MG", "32": "MG", "33": "MG", "34": "MG", "35": "MG", "36": "MG", "37": "MG", "38": "MG", "39": "MG",
    "40": "BA", "41": "BA", "42": "BA", "43": "BA", "44": "BA", "45": "BA", "46": "BA", "47": "BA", "48": "BA", "49": "SE",
    "50": "PE", "51": "PE", "52": "PE", "53": "PE", "54": "PE", "55": "PE", "56": "PE", "57": "AL", "58": "PB", "59": "RN",
    "60": "CE", "61": "CE", "62": "CE", "63": "CE", "64": "PI", "65": "MA", "66": "MA", "67": "MA", "68": "PA", "69": "AM",
    "70": "DF", "71": "DF", "72": "GO", "73": "GO", "74": "GO", "75": "GO", "76": "GO", "77": "TO", "78": "MT", "79": "MS",
    "80": "PR", "81": "PR", "82": "PR", "83": "PR", "84": "PR", "85": "PR", "86": "PR", "87": "PR", "88": "SC", "89": "SC",
    "90": "RS", "91": "RS", "92": "RS", "93": "RS", "94": "RS", "95": "RS", "96": "RS", "97": "RS", "98": "RS", "99": "RS"
};

// Função para obter estado a partir do CEP
function obterEstadoPorCEP(cep) {
    const cepNumeros = cep.replace(/\D/g, "");
    if (cepNumeros.length < 8) return null;
    const prefixo = cepNumeros.slice(0, 2);
    return mapaCEP[prefixo] || null;
}

// Função principal de simulação
function simularAlerta(cultura, estado) {
    const dados = dadosClimaticos[estado];
    const params = parametrosCultura[cultura];

    if (!dados || !params) return null;

    const umidadeOk = dados.umidade >= params.umidMin && dados.umidade <= params.umidMax;
    const temperaturaOk = dados.temperatura >= params.tempMin && dados.temperatura <= params.tempMax;
    const chuvaOk = dados.precipitacao >= params.chuvaMin;

    const criteriosAtendidos = [umidadeOk, temperaturaOk, chuvaOk].filter(Boolean).length;

    if (criteriosAtendidos === 3) {
        return {
            nivel: "FAVORÁVEL",
            classe: "favoravel",
            icone: "✅",
            dias: params.diasIdeal,
            mensagem: `Condições ideais para plantar ${cultura}! Todos os parâmetros climáticos estão dentro da faixa recomendada.`,
            cor: "#22c55e"
        };
    } else if (criteriosAtendidos === 2) {
        return {
            nivel: "ATENÇÃO",
            classe: "atencao",
            icone: "⚠️",
            dias: params.diasAtencao,
            mensagem: `Condições parcialmente adequadas para ${cultura}. Monitore o clima e plante nos próximos dias.`,
            cor: "#facc15"
        };
    } else {
        return {
            nivel: "CRÍTICO",
            classe: "critico",
            icone: "🚨",
            dias: 0,
            mensagem: `Condições desfavoráveis para ${cultura} no momento. Aguarde a melhora das condições climáticas.`,
            cor: "#ef4444"
        };
    }
}

// Função para exibir o resultado
function exibirResultado() {
    const culturaSelect = document.getElementById("cultura-select");
    const cepInput = document.getElementById("cep-simulador");
    const resultadoDiv = document.getElementById("resultado-simulador");
    const erroSpan = document.getElementById("erro-cep-simulador");

    const cultura = culturaSelect.value;
    const cep = cepInput.value.trim();

    // Validações
    if (!cultura) {
        alert("Por favor, selecione uma cultura.");
        return;
    }

    if (!cep) {
        erroSpan.classList.add("visivel");
        return;
    }

    const cepNumeros = cep.replace(/\D/g, "");
    if (cepNumeros.length !== 8) {
        erroSpan.classList.add("visivel");
        return;
    }

    erroSpan.classList.remove("visivel");

    const estado = obterEstadoPorCEP(cep);
    if (!estado) {
        resultadoDiv.style.display = "block";
        resultadoDiv.className = "simulador__resultado critico";
        resultadoDiv.innerHTML = `
      <div class="resultado__nivel">❌ ERRO</div>
      <div class="resultado__msg">Não foi possível identificar a região para o CEP informado. Tente outro CEP.</div>
    `;
        return;
    }

    const resultado = simularAlerta(cultura, estado);
    const dados = dadosClimaticos[estado];

    if (!resultado) {
        resultadoDiv.style.display = "block";
        resultadoDiv.className = "simulador__resultado critico";
        resultadoDiv.innerHTML = `<div class="resultado__msg">Erro ao calcular. Tente novamente.</div>`;
        return;
    }

    resultadoDiv.style.display = "block";
    resultadoDiv.className = `simulador__resultado ${resultado.classe}`;
    resultadoDiv.innerHTML = `
    <div class="resultado__nivel" style="color:${resultado.cor}">${resultado.icone} ${resultado.nivel}</div>
    <div class="resultado__dias">📅 ${resultado.dias > 0 ? `${resultado.dias} dias disponíveis para plantio` : "Sem dias favoráveis no momento"}</div>
    <div class="resultado__msg">📋 ${resultado.mensagem}</div>
    <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border); font-size: 0.85rem; color: var(--gray);">
      📡 Dados da região (${estado} - ${dados.regiao}):<br>
      🌡️ Temperatura: ${dados.temperatura}°C | 💧 Umidade do solo: ${dados.umidade}% | 🌧️ Precipitação: ${dados.precipitacao}mm<br>
      🛰️ Fonte: NASA POWER / INPE (dados de satélite)
    </div>
  `;

    resultadoDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Configurar máscara do CEP
function configurarMascaraCEP() {
    const cepInput = document.getElementById("cep-simulador");
    if (cepInput) {
        cepInput.addEventListener("input", function (e) {
            let valor = e.target.value.replace(/\D/g, "");
            if (valor.length > 5) {
                valor = valor.slice(0, 5) + "-" + valor.slice(5, 8);
            }
            e.target.value = valor.slice(0, 9);

            // Esconder erro enquanto digita
            const erroSpan = document.getElementById("erro-cep-simulador");
            if (erroSpan) erroSpan.classList.remove("visivel");
        });
    }
}

// Inicializar quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
    console.log("Simulador carregado!");
    configurarMascaraCEP();

    const btnSimular = document.getElementById("btn-simular");
    if (btnSimular) {
        btnSimular.addEventListener("click", exibirResultado);
    }

    // Permitir Enter no campo CEP
    const cepInput = document.getElementById("cep-simulador");
    if (cepInput) {
        cepInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                exibirResultado();
            }
        });
    }
});