function enviar() {
  const nome = document.querySelector("input[type='text']").value;
  const email = document.querySelector("input[type='email']").value;
  const msg = document.querySelector("textarea").value;

  if (!nome || !email || !msg) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
  alert(`✅ Obrigado, ${nome}! Sua mensagem foi enviada para o ClimaPlantio.`);
  // Limpar (opcional)
  document.querySelector("input[type='text']").value = "";
  document.querySelector("input[type='email']").value = "";
  document.querySelector("textarea").value = "";
}