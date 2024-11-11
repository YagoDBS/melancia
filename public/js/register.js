window.addEventListener("load", () => {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("login").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const rsenha = document.getElementById("rsenha").value;
        if(senha != rsenha){
            document.getElementById("erroRSenha").innerText = "As senhas devem ser iguais";
            document.getElementById("senha").value = "";
            document.getElementById("rsenha").value = "";
            return 0;
        }
        fetch(`http://localhost:5000/api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, senha }),
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