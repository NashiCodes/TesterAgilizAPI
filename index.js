// scripts.js

// Função para capturar valores do formulário de login
function captureLoginValues() {
    const emailValue = document.getElementById('email1').value;
    const passwordValue = document.getElementById('password1').value;
    const quadro = document.getElementById('resultadoLogin');

    fetch(`http://localhost:5249/api/User?email=${emailValue}&password=${passwordValue}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const pre = document.createElement('pre');
            const code = document.createElement('code');
            code.innerHTML = JSON.stringify(data, null, 2);
            pre.appendChild(code);
            quadro.appendChild(pre);
        })
        .catch(error => {
            console.log(error);
        });
}

// Função para capturar valores do formulário de cadastro
// Função para capturar valores do formulário de cadastro
function captureCadastroValues() {
    const nomeValue = document.getElementById('nome').value;
    const cpfValue = document.getElementById('cpf').value;
    const telefoneValue = document.getElementById('telefone').value;
    const emailValue = document.getElementById('email2').value;
    const cepValue = document.getElementById('cep').value;
    const numeroValue = document.getElementById('numero').value;
    const passwordValue = document.getElementById('password2').value;
    const confirmValue = document.getElementById('confirm').value;
    const quadro = document.getElementById('resultadoCadastro');

    try {
        verificarCampos(nomeValue, cpfValue, telefoneValue, emailValue, cepValue, numeroValue, passwordValue, confirmValue);

        // Preparar os dados do formulário para enviar
        const formData = {
            email: emailValue,
            password: passwordValue,
            name: nomeValue,
            phone: telefoneValue,
            cpf: cpfValue,
            address: cepValue, // Usando CEP como endereço
            addressNumber: numeroValue
        };

        // Enviar os dados do formulário para a API
        fetch('http://localhost:5249/api/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Exibir os dados de resposta no quadro
                const pre = document.createElement('pre');
                const code = document.createElement('code');
                code.innerHTML = JSON.stringify(data, null, 2);
                pre.appendChild(code);
                quadro.appendChild(pre);
            })
            .catch(error => {
                console.error(error);
            });

    } catch (e) {
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.innerHTML = e;
        pre.appendChild(code);
        quadro.appendChild(pre);
    }
}


// Função para verificar se os campos estão preenchidos
function verificarCampos(...campos) {
    verificarVazios(...campos);
    verificarEmail(campos[3]);
    verificarCPF(campos[1]);
    verificarSenha(campos[6], campos[7]);
}


// Função para verificar se os campos estão preenchidos
function verificarVazios(...campos) {
    for (let campo of campos) {
        if (!campo.trim()) {
            throw new Error("Preencha todos os campos");
        }
    }
}

// Função para verificar se o email é válido
function verificarEmail(email) {
    const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!re.test(email)) {
        throw new Error("Email inválido");
    }
}

// Função para verificar se o CPF é válido
function verificarCPF(cpf) {
    if (cpf.replace(/\D/g, '').length !== 11) {
        throw new Error("CPF inválido");
    }
}

// Função para verificar se as senhas são iguais
function verificarSenha(senha, confirmacao) {
    if (senha !== confirmacao) {
        throw new Error("Senhas não conferem");
    }
}


// Função para capturar valores do formulário de login
document.getElementById('button1').addEventListener('click', captureLoginValues);

// Função para capturar valores do formulário de cadastro
document.getElementById('button2').addEventListener('click', captureCadastroValues);