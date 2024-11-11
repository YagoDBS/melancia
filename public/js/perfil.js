const token = localStorage.getItem("token");
window.addEventListener("load", () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");

    if(userId){
        console.log("userid existe")
        fetch(`http://localhost:5000/api/perfil/${userId}`, {
            method: "GET",
            headers: {
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
                    window.location.href = "/public/login.html";
                } else {
                    document.getElementById("nome").textContent = user.username;
                    const achievementField = document.getElementById("achievementField");
                    if(user.achievements.includes("matou")){
                        achievementField.innerHTML += `<img src="img/melancia.png" alt="Troféu De Matador De Melâncias" width=40px>`;
                    }
                    if(user.achievements.includes("semente")){
                        achievementField.innerHTML += `<img src="img/semente.png" alt="Troféu De Encontrador De Sementes" width=40px>`;
                    }
                    if(user.achievements.includes("achou")){
                        achievementField.innerHTML += `<img src="img/osentido.jpg" alt="Troféu De Encontrador Do Sentido Da Vida" width=40px>`;
                    }
                    if(user.achievements.includes("matou") && user.achievements.includes("semente") && user.achievements.includes("achou")){
                        document.getElementById("perfilField").style.border = "1px solid gold";
                    }
                    const descField = document.getElementById("desc");
                    if(user.desc){
                        descField.textContent = user.desc;
                    }else{
                        descField.textContent = "Usuário ainda não possui descrição";
                    }
                }
            })
            .catch((error) => {
                console.error("Erro ao pegar perfil:", error)
                alert("Erro ao pegar perfil:", error);
            });
    } else {
        if(!token){
            alert("Token faltando");
            console.error("Tolkien faltiando");
            window.location.href = "/public/login.html";
        } else {
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
                    window.location.href = "/public/login.html";
                } else {
                    document.getElementById("nome").textContent = user.username;
                    const achievementField = document.getElementById("achievementField");
                    if(user.achievements.includes("matou")){
                        achievementField.innerHTML += `<img src="img/melancia.png" alt="Troféu De Matador De Melâncias" width=40px>`;
                    }
                    if(user.achievements.includes("semente")){
                        achievementField.innerHTML += `<img src="img/semente.png" alt="Troféu De Encontrador De Sementes" width=40px>`;
                    }
                    if(user.achievements.includes("achou")){
                        achievementField.innerHTML += `<img src="img/osentido.jpg" alt="Troféu De Encontrador Do Sentido Da Vida" width=40px>`;
                    }
                    if(user.achievements.includes("matou") && user.achievements.includes("semente") && user.achievements.includes("achou")){
                        document.getElementById("perfilField").style.border = "1px solid gold";
                    }
                    const descField = document.getElementById("desc");
                    if(user.desc){
                        descField.textContent = user.desc;
                    }else{
                        descField.textContent = "Usuário ainda não possui descrição";
                    }
                    document.getElementById("email").textContent = user.email;
                    document.getElementById("btnField").innerHTML = 
                    `<button onclick="editarDescricao()" id="btnEditarDescricao">Editar Descrição</button><br>
                    <button onclick="finalizarSessao()" id="btnFinalizarSessao">Finalizar Sessão</button>`;
                }
            })
            .catch((error) => {
                console.error("Erro ao pegar perfil:", error)
                alert("Erro ao pegar perfil:", error);
                window.location.href = "/public/login.html";
            }); 
        }
        
    }
})


function finalizarSessao(){
    localStorage.removeItem("token");
    window.location.href = "/public/login.html";
}

function editarDescricao(){
    const descField = document.getElementById("desc");
    let desc = descField.innerText;
    document.getElementById("btnEditarDescricao").remove();
    descField.innerHTML = `<form>
    <textarea id="inputDesc">${desc}</textarea><br>
    <button type="submit">Confirmar</button>
    </form>`;
    descField.addEventListener("submit", async(e) => {
        e.preventDefault();
        desc = document.getElementById("inputDesc").value;
        fetch(`http://localhost:5000/api/desc`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ desc }),
        })
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    alert(data.message);
                }
                return response.json();
            })
            .then((data) => {
                alert(data.message);
                location.reload();
            })
            .catch((error) => {
                console.error("Erro:", error);
                alert("Algo deu errado.");
            });
    })
}

