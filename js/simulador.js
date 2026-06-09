function simular(){

    const cultura = document.getElementById("cultura").value;
    const cep = document.getElementById("cep").value;
    const resultado = document.getElementById("resultado");

    if(!cep){

        resultado.innerHTML = `
        <div class="result-card">
            <span class="status-bad">ERRO</span>
            <p>Digite um CEP válido.</p>
        </div>`;
        return;
    }

    const nivel = Math.floor(Math.random() * 3);

    if(nivel === 0){

        resultado.innerHTML = `
        <div class="result-card">
            <span class="status-good">FAVORÁVEL</span>
            <p>Condições ideais para plantar ${cultura}.</p>
            <p>Recomendação: plantar nos próximos 3 dias.</p>
        </div>`;
    }

    if(nivel === 1){

        resultado.innerHTML = `
        <div class="result-card">
            <span class="status-mid">ATENÇÃO</span>
            <p>Clima instável na região.</p>
            <p>Recomendação: aguardar 2 a 4 dias.</p>
        </div>`;
    }

    if(nivel === 2){

        resultado.innerHTML = `
        <div class="result-card">
            <span class="status-bad">CRÍTICO</span>
            <p>Condições inadequadas para plantio.</p>
            <p>Recomendação: aguardar melhora climática.</p>
        </div>`;
    }
}