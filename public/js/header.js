window.addEventListener("load", () => {
    let headerPerfil = document.getElementById("headerPerfil");
    const token = localStorage.getItem("token");
    if (!token) {
        headerPerfil.innerHTML = `<a href="login.html" id="headerPerfil">Entrar</a>`
    } else {
        fetch("http://localhost:5000/api/perfil", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((userData) => {
                if (userData.message) {
                    console.log(userData.message);
                    localStorage.removeItem("token");
                    headerPerfil.innerHTML = `<a href="login.html" id="headerPerfil">Entrar</a>`;
                } else {
                    headerPerfil.innerHTML = `<a href="perfil.html" id="headerPerfil">${userData.username}</a>`
                }
            })
            .catch((error) => {
                console.error("Erro ao pegar perfil:", error)
                headerPerfil.innerHTML = `<a href="login.html" id="headerPerfil">Entrar</a>`;
            });
    }
});



