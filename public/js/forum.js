window.addEventListener("load", () => {
    let currentUser = null;
    const token = localStorage.getItem("token");
    
    if (!token) {
        //esconder botao

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
                    alert(userData.message);
                    window.location.href = "/public/login.html";
                } else {
                    currentUser = userData;
                    console.log(`Bem vindo, ${userData.username}`);
                }
            })
            .catch((error) => console.error("Error fetching user data:", error));
    }


    const postField = document.getElementById("postField");

    fetch("http://localhost:5000/api/comentario", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((posts) => {
            if (posts.message) {
                alert(posts.message);
            } else {
                posts.forEach(post => {
                    postField.innerHTML += `<div id="post"><p>De: <a href="perfil.html?userId=${post.userId}">${post.autor}</a></p><p>${post.text}</p></div>`;
                })
            }
        }).catch((erro) => console.error("Error ao pegar post: ", erro));
    const comentarioForm = document.getElementById("comentarioForm");

    comentarioForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const comentario = document.getElementById("comentario").value;
        console.log(comentario);
        if (!currentUser) {
            alert("Você deve estar logado para comentar!");
            return;
        }
        fetch(`http://localhost:5000/api/comentario`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                autor: currentUser.username,
                userId: currentUser._id,
                text: comentario,
            }),
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
                document.getElementById("comentario").value = "";
                location.reload();
            })
            .catch((error) => {
                console.error("Erro:", error);
                alert("Algo deu errado.");
            });
    });
})