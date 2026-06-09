const dadosSimulados = {
  SP: { umidade: 62, precipitacao: 45, temperatura: 24 },
  MG: { umidade: 55, precipitacao: 30, temperatura: 22 },
  GO: { umidade: 48, precipitacao: 20, temperatura: 27 },
  MT: { umidade: 71, precipitacao: 60, temperatura: 29 },
  RS: { umidade: 58, precipitacao: 50, temperatura: 18 },
  PR: { umidade: 65, precipitacao: 55, temperatura: 21 },
  MS: { umidade: 52, precipitacao: 25, temperatura: 26 },
  BA: { umidade: 40, precipitacao: 15, temperatura: 30 },
  PA: { umidade: 80, precipitacao: 90, temperatura: 31 },
  CE: { umidade: 35, precipitacao: 10, temperatura: 33 },
};

const parametrosCultura = {
  Milho: { umidMin: 50, umidMax: 80, tempMin: 18, tempMax: 32 },
  Soja: { umidMin: 55, umidMax: 85, tempMin: 20, tempMax: 30 },
  Feijão: { umidMin: 45, umidMax: 75, tempMin: 16, tempMax: 28 },
  Arroz: { umidMin: 70, umidMax: 95, tempMin: 22, tempMax: 35 },
  Trigo: { umidMin: 40, umidMax: 70, tempMin: 10, tempMax: 24 },
};

const mapaEstado = {
  "01": "SP", "02": "SP", "03": "SP", "04": "SP", "05": "SP", "06": "SP", "07": "SP", "08": "SP", "09": "SP",
  "11": "SP", "12": "SP", "13": "SP", "14": "SP", "15": "SP", "16": "SP", "17": "SP", "18": "SP", "19": "SP",
  "20": "RJ", "21": "RJ", "22": "RJ", "23": "RJ", "24": "RJ", "25": "RJ", "26": "RJ", "27": "RJ", "28": "RJ",
  "29": "ES", "30": "MG", "31": "MG", "32": "MG", "33": "MG", "34": "MG", "35": "MG", "36": "MG", "37": "MG",
  "38": "MG", "39": "MG", "40": "BA", "41": "BA", "42": "BA", "43": "BA", "44": "BA", "45": "BA", "46": "BA",
  "47": "BA", "48": "BA", "49": "SE", "50": "PE", "51": "PE", "52": "PE", "53": "PE", "54": "PE", "55": "PE",
  "56": "PE", "57": "AL", "58": "PB", "59": "RN", "60": "CE", "61": "CE", "62": "CE", "63": "CE",
  "64": "PI", "65": "MA", "66": "MA", "67": "MA", "68": "PA", "69": "AM", "70": "DF", "71": "DF",
  "72": "GO", "73": "GO", "74": "GO", "75": "GO", "76": "GO", "77": "TO", "78": "MT", "79": "MS",
  "80": "PR", "81": "PR", "82": "PR", "83": "PR", "84": "PR", "85": "PR", "86": "PR", "87": "PR",
  "88": "SC", "89": "SC", "90": "RS", "91": "RS", "92": "RS", "93": "RS", "94": "RS", "95": "RS",
  "96": "RS", "97": "RS", "99": "RS"
};

function calcularAlerta(cultura, estado) {
  const dados = dadosSimulados[estado];
  const params = parametrosCultura[cultura];
  
  if (!dados || !params) return null;

  const umidOk = dados.umidade >= params.umidMin && dados.umidade <= params.umidMax;
  const tempOk = dados.temperatura >= params.tempMin && dados.temperatura <= params.tempMax;
  const chuvaOk = dados.precipitacao >= 15;

  const criterios = [umidOk, tempOk, chuvaOk].filter(Boolean).length;

  if (criterios === 3) {
    return { 
      nivel: "FAVORÁVEL", 
      classe: "favoravel", 
      icone: "✅", 
      dias: 7,
      msg: `Condições ideais para ${cultura}. Plante nos próximos 7 dias.`,
      detalhes: `Umidade: ${dados.umidade}% | Temp: ${dados.temperatura}°C | Chuva: ${dados.precipitacao}mm`
    };
  } else if (criterios === 2) {
    return { 
      nivel: "ATENÇÃO", 
      classe: "atencao", 
      icone: "⚠️", 
      dias: 3,
      msg: `Condições parcialmente adequadas para ${cultura}. Monitore e plante em até 3 dias.`,
      detalhes: `Umidade: ${dados.umidade}% | Temp: ${dados.temperatura}°C | Chuva: ${dados.precipitacao}mm`
    };
  } else {
    return { 
      nivel: "CRÍTICO", 
      classe: "critico", 
      icone: "🚨", 
      dias: 0,
      msg: `Condições desfavoráveis para ${cultura}. Aguarde melhora climática.`,
      detalhes: `Umidade: ${dados.umidade}% | Temp: ${dados.temperatura}°C | Chuva: ${dados.precipitacao}mm`
    };
  }
}

function iniciarSimulador() {
  const form = document.querySelector("#form-simulador");
  if (!form) return;

  // Máscara de CEP
  const cepInput = document.querySelector("#cep-simulador");
  if (cepInput) {
    cepInput.addEventListener("input", function() {
      this.value = this.value.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2").slice(0, 9);
    });
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const cultura = document.querySelector("#cultura-select")?.value;
    const cep = document.querySelector("#cep-simulador")?.value.trim();

    if (!cultura) {
      alert("Por favor, selecione uma cultura.");
      return;
    }

    if (!cep || cep.replace(/\D/g, "").length < 8) {
      const erroEl = document.querySelector("#erro-cep-simulador");
      if (erroEl) erroEl.classList.add("visivel");
      return;
    }

    const erroEl = document.querySelector("#erro-cep-simulador");
    if (erroEl) erroEl.classList.remove("visivel");

    const prefixo = cep.replace(/\D/g, "").slice(0, 2);
    const uf = mapaEstado[prefixo] || "SP";
    const estadoFinal = dadosSimulados[uf] ? uf : "SP";

    const resultado = calcularAlerta(cultura, estadoFinal);
    if (!resultado) return;

    const el = document.querySelector("#resultado-simulador");
    if (!el) return;

    el.className = `simulador__resultado ${resultado.classe}`;
    el.innerHTML = `
      <div class="resultado__nivel">${resultado.icone} ${resultado.nivel}</div>
      <div class="resultado__dias">📅 ${resultado.dias > 0 ? `${resultado.dias} dias disponíveis` : "Sem dias favoráveis no momento"}</div>
      <div class="resultado__msg">📋 ${resultado.msg}</div>
      <div class="resultado__dias" style="margin-top:.5rem;font-size:.82rem;">
        📡 ${resultado.detalhes}<br>
        🛰️ Fonte: NASA POWER / INPE (dados simulados para ${estadoFinal})
      </div>
    `;
    el.style.display = "block";
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

document.addEventListener("DOMContentLoaded", iniciarSimulador);