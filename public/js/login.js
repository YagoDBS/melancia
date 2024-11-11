window.addEventListener("load", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("login").value;
        const senha = document.getElementById("senha").value;
        fetch(`http://localhost:5000/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, senha }),
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
                localStorage.setItem("token", data.token);
                window.location.href = "/public/perfil.html";
            })
            .catch((error) => {
                console.error("Erro:", error);
                alert("Algo deu errado.");
            });
    });
})