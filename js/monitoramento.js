function gerarDados(){

    const temp = document.getElementById("temp");
    const umidade = document.getElementById("umidade");
    const chuva = document.getElementById("chuva");
    const status = document.getElementById("status");

    const t = Math.floor(Math.random() * 15) + 20;
    const u = Math.floor(Math.random() * 40) + 50;
    const c = Math.floor(Math.random() * 30);

    temp.innerText = t;
    umidade.innerText = u;
    chuva.innerText = c;

    if(u > 70 && c < 10){
        status.innerText = "FAVORÁVEL";
        status.style.color = "#22c55e";
    }

    else if(u > 50){
        status.innerText = "ATENÇÃO";
        status.style.color = "#facc15";
    }

    else{
        status.innerText = "CRÍTICO";
        status.style.color = "#ef4444";
    }
}