// scripts.js

// Função para capturar valores do formulário de login
function captureLoginValues() {
    const emailValue = document.getElementById('email1').value;
    const passwordValue = document.getElementById('password1').value;
    const quadro = document.getElementById('resultadoLogin');
    try {
        verificarVazios(emailValue, passwordValue);
        verificarEmail(emailValue);
    } catch (error) {
        quadro.innerHTML = "";
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.innerHTML = error;
        pre.appendChild(code);
        quadro.appendChild(pre);
        return;
    }


    const formData = {
        email: emailValue,
        password: passwordValue
    };
    fetch('http://localhost:5249/api/User', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            quadro.innerHTML = "";
            const pre = document.createElement('pre');
            const code = document.createElement('code');
            code.innerHTML = JSON.stringify(data, null, 2);
            pre.appendChild(code);
            quadro.appendChild(pre);
        })
        .catch(error => {
            quadro.innerHTML = "";
            const pre = document.createElement('pre');
            const code = document.createElement('code');
            code.innerHTML = error;
            pre.appendChild(code);
            quadro.appendChild(pre);
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
    } catch (error) {
        quadro.innerHTML = "";
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.innerHTML = error;
        pre.appendChild(code);
        quadro.appendChild(pre);
        return;
    }
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
            quadro.innerHTML = "";
            const pre = document.createElement('pre');
            const code = document.createElement('code');
            code.innerHTML = JSON.stringify(data, null, 2);
            pre.appendChild(code);
            quadro.appendChild(pre);
        })
        .catch(error => {
            quadro.innerHTML = "";
            const pre = document.createElement('pre');
            const code = document.createElement('code');
            code.innerHTML = error;
            pre.appendChild(code);
            quadro.appendChild(pre);
        });


}


// Função para verificar se os campos estão preenchidos
function verificarCampos(...campos) {
    verificarVazios(...campos);
    verificarEmail(campos[3]);
    verificarCPF(campos[1]);
    verificarCEP(campos[4]);
    verificarTelefone(campos[2]);
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

// Função para verificar se o CEP é válido
function verificarCEP(cep) {
    // Remove hífens e espaços em branco
    cep = cep.replace(/-|\s/g, '');

    // Verifica se o CEP contém exatamente 8 dígitos
    const re = /^[0-9]{8}$/;
    if (!re.test(cep)) {
        throw new Error("CEP inválido");
    }
}


// Função para verificar se o número é válido
function verificarTelefone(telefone) {
    // Remove parênteses, espaços em branco, hífens e o sinal de mais
    telefone = telefone.replace(/\(|\)|\s|-|\+/g, '');

    // Verifica se o telefone começa com '55' (código do país para o Brasil)
    if (telefone.startsWith('55')) {
        telefone = telefone.slice(2);
    }

    // Verifica se o telefone contém apenas dígitos e tem exatamente 10 ou 11 dígitos
    const re = /^[0-9]{10,11}$/;
    if (!re.test(telefone)) {
        throw new Error("Número de telefone inválido");
    }
}

function verificarSenhaForte(senha) {
    // Verifica se a senha tem pelo menos 8 caracteres
    if (senha.length < 8) {
        throw new Error("A senha deve ter pelo menos 8 caracteres");
    }

    // Verifica se a senha contém pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(senha)) {
        throw new Error("A senha deve conter pelo menos uma letra maiúscula");
    }

    // Verifica se a senha contém pelo menos uma letra minúscula
    if (!/[a-z]/.test(senha)) {
        throw new Error("A senha deve conter pelo menos uma letra minúscula");
    }

    // Verifica se a senha contém pelo menos um número
    if (!/[0-9]/.test(senha)) {
        throw new Error("A senha deve conter pelo menos um número");
    }

    // Verifica se a senha contém pelo menos um caractere especial
    if (!/[!@#$%^&*]/.test(senha)) {
        throw new Error("A senha deve conter pelo menos um caractere especial (!@#$%^&*)");
    }
}


// Função para capturar valores do formulário de login
document.getElementById('button1').addEventListener('click', captureLoginValues);

// Função para capturar valores do formulário de cadastro
document.getElementById('button2').addEventListener('click', captureCadastroValues);