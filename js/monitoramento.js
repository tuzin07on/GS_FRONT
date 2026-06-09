function gerarDados() {
  const temp = 18 + Math.random() * 15;
  const umidade = 45 + Math.random() * 45;
  const chuva = Math.random() * 40;

  document.getElementById("temp").innerText = temp.toFixed(1);
  document.getElementById("umidade").innerText = Math.floor(umidade);
  document.getElementById("chuva").innerText = Math.floor(chuva);

  const statusEl = document.getElementById("status");
  
  if (umidade > 70 && chuva < 15) {
    statusEl.innerHTML = "🌿 FAVORÁVEL";
    statusEl.style.color = "#52B788";
    statusEl.style.fontSize = "1.3rem";
  } else if (umidade > 50) {
    statusEl.innerHTML = "⚠️ ATENÇÃO";
    statusEl.style.color = "#F9C74F";
    statusEl.style.fontSize = "1.3rem";
  } else {
    statusEl.innerHTML = "🚨 CRÍTICO";
    statusEl.style.color = "#E63946";
    statusEl.style.fontSize = "1.3rem";
  }
}

document.addEventListener("DOMContentLoaded", gerarDados);