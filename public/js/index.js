const token = localStorage.getItem("token");
let interval;
function diminuirMelancia() {
    let escala = 1;
    melancia.style.transition = 'none';
    interval = setInterval(() => {
        escala -= 0.01;
        if (escala <= 0) {
            escala = 0;
            clearInterval(interval);
            matarMelancia();
        }
        melancia.style.scale = escala;
    }, 20);
}

function abrirMelancia() {
    clearInterval(interval);
    let melancia = document.getElementById("melancia");
    melancia.style.transition = 'scale ease-in 2s, opacity ease-in 2s';
    melancia.style.scale = 100;
    melancia.style.opacity = 0;
    let posmelancia = document.getElementById("pos-melancia");
    posmelancia.style.opacity = 100;
    document.body.style.backgroundColor = "#F05154";
    setTimeout(deletarMelancia, 2000);
}

function deletarMelancia() {
    let melancia = document.getElementById("melancia-container");
    melancia.remove();
}

window.addEventListener("load", () => {
    let btnMostrar = document.getElementById("btnMostrar");
    btnMostrar.onclick = mostrarTexto;
});


function mostrarTexto() {
    let textoContainer = document.getElementById("texto-container");
    textoContainer.style.display = "block";
    let btnMostrar = document.getElementById("btnMostrar");
    btnMostrar.textContent = "Saiba menos";
    btnMostrar.onclick = esconderTexto;
}

function esconderTexto() {
    let textoContainer = document.getElementById("texto-container");
    textoContainer.style.display = "none";
    let btnMostrar = document.getElementById("btnMostrar");
    btnMostrar.textContent = "Saiba mais";
    btnMostrar.onclick = mostrarTexto;
}

function matarMelancia() {
    deletarMelancia();
    let posmelancia = document.getElementById("pos-melancia");
    posmelancia.style.opacity = 100;
    posmelancia.style.color = "#F05154";
    document.getElementById("conteudo-centralizado").style.backgroundColor = "black";
    if(token){
        fetch("http://localhost:5000/api/perfil", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            console.log(response);
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((user) => {
            if (user.message) {
                alert(user.message);
            } else {
                if (!user.achievements.includes("matou")) {
                    desbloquearMatar();
                }
            }
        })
        .catch((error) => {
            console.error("Erro ao pegar perfil:", error)
            alert("Erro ao pegar perfil:", error);
        });
    }
    
}

async function desbloquearMatar() {
    fetch(`http://localhost:5000/api/achievement`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            achievement: "matou",
        }),
    })
        .then((response) => {
            console.log(response);
            if (!response.ok) {
                alert(data.message);
            }
            return response.json();
        })
        .then(() => {
            alert("Conquista desbloqueada: Mate a melancia.");
        })
        .catch((error) => {
            console.error("Erro:", error);
            alert("Algo deu errado.");
        });
}