const token = localStorage.getItem("token");
window.addEventListener("load", () => {
    const btnMostrar = document.getElementById("btnMostrar");
    
    btnMostrar.onclick = mostrarImagens;
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
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((user) => {
            if (user.message) {
                alert(user.message);
            } else {
                if(user.achievements.includes("semente")){
                    const semente = document.getElementById("semente");
                    semente.remove();
                }
            }
        })
        .catch((error) => {
            console.error("Erro ao pegar perfil:", error)
            alert("Erro ao pegar perfil:", error);
        });
    }else{
        const semente = document.getElementById("semente");
        semente.remove();
    }
    
})


function mostrarImagens() {
    const imagensContainer = document.getElementById("imagens-container");
    imagensContainer.style.display = "block";
    const btnMostrar = document.getElementById("btnMostrar");
    btnMostrar.textContent = "Esconder imagens";
    btnMostrar.onclick = esconderImagens;
}

function esconderImagens() {
    const imagensContainer = document.getElementById("imagens-container");
    imagensContainer.style.display = "none";
    const btnMostrar = document.getElementById("btnMostrar");
    btnMostrar.textContent = "Mostrar imagens";
    btnMostrar.onclick = mostrarImagens;
}

async function desbloquearSemente() {
    const semente = document.getElementById("semente");
    fetch(`http://localhost:5000/api/achievement`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            achievement: "semente",
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
            alert("Conquista desbloqueada: Encontre a semente.");
        })
        .catch((error) => {
            console.error("Erro:", error);
            alert("Algo deu errado.");
        });
}

