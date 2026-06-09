function gerarDados() {
  const temp = 18 + Math.random() * 15;
  const umidade = 45 + Math.random() * 45;
  const chuva = Math.random() * 40;

  document.getElementById("temp").innerText = temp.toFixed(1);
  document.getElementById("umidade").innerText = Math.floor(umidade);
  document.getElementById("chuva").innerText = Math.floor(chuva);
  
  const statusEl = document.getElementById("status");
  if (umidade > 70 && chuva < 15) {
    statusEl.innerText = "🌿 FAVORÁVEL";
    statusEl.style.color = "#22c55e";
  } else if (umidade > 50) {
    statusEl.innerText = "🔸 ATENÇÃO";
    statusEl.style.color = "#facc15";
  } else {
    statusEl.innerText = "⚠️ CRÍTICO";
    statusEl.style.color = "#ef4444";
  }
}
window.onload = gerarDados;