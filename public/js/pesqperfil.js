window.addEventListener("load", () => {
    const pesqForm = document.getElementById("pesqForm");

    pesqForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const pesqTermo = document.getElementById("pesqTermo").value;
        if (!pesqTermo) return;

        fetch(`http://localhost:5000/api/search?term=${pesqTermo}`, {
            method: "GET",
            headers: {
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
            .then((users) => {
                const perfisField = document.getElementById("perfisField");
                    perfisField.innerHTML = "";
        
                    if (users.length === 0) {
                        const sRegex = /O\s*Sentido\s*Da\s*Vida/i;
                        if(sRegex.test(pesqTermo)){
                            perfisField.innerHTML += `<a href="achou.html" class="resultado">O Sentido Da Vida</a><br>`;
                        }else{
                            perfisField.innerHTML += `<p class="nada">Nada achado.</p>`;
                        }
                    } else {
                        const sRegex = /O\s*Sentido\s*Da\s*Vida/i;
                        if(sRegex.test(pesqTermo)){
                            perfisField.innerHTML += `<a href="achou.html" class="resultado">O Sentido Da Vida</a><br>`;
                        }
                        users.forEach(user => {
                            perfisField.innerHTML += `<a href="perfil.html?userId=${user._id}" class="resultado">${user.username}</a><br>`;
                        });
            }})
            .catch((error) => {
                console.error("Erro:", error);
                alert("Algo deu errado.");
            });
    });

})