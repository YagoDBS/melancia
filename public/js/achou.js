const token = localStorage.getItem("token");
window.addEventListener("load", () => {
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
                throw new Error(`erro HTTP! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((user) => {
            if (user.message) {
                alert(user.message);
            } else {
                if(!user.achievements.includes("achou")){
                    desbloquearAchou();
                }
            }
        })
        .catch((erro) => {
            console.error("Erro ao pegar perfil:", erro)
            alert("Erro ao pegar perfil:", erro);
        });
    }
    
})

async function desbloquearAchou(){
    fetch(`http://localhost:5000/api/achievement`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            achievement: "achou",
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
            alert("Conquista desbloqueada: Encontre o sentido da vida.");
        })
        .catch((erro) => {
            console.error("Erro:", erro);
            alert("Algo deu errado.");
        });
}