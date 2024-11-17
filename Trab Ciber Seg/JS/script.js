function confirmPurchase() {
    // Pegando a seleção do método de pagamento
    const cardPayment = document.getElementById('card').checked;
    
    // Verificando se o método de pagamento foi selecionado
    if (cardPayment) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: `Compra confirmada!`,
            showConfirmButton: false,
            timer: 1500
        }) .then((result) => {
           // Adicionando a classe 'active' 
           const steps = document.querySelectorAll('.step');
           if (steps.length >= 2) {
               steps[2].classList.add('active');  
               steps[3].classList.add('active');  
           }

           // Remover informações de pagamento
           const paymentSection = document.querySelector('.payment-method');
           const inputFieldsSection = document.querySelector('.input-fields');
           const panelFooter = document.querySelector('.panel-footer');
           const title = document.querySelector('.title');

           // Ocultar informações de pagamento e input 
           paymentSection.style.display = 'none';
           inputFieldsSection.style.display = 'none';
           panelFooter.style.display = 'none'; 
           document.querySelector('.title').style.display = 'none';

           // Exibir a mensagem de compra confirmada
           title.innerHTML = 'Compra Confirmada!';
           const confirmationMessage = document.createElement('div');
           confirmationMessage.classList.add('confirmation-message'); 
           confirmationMessage.innerHTML = `
               <p>Compra concluída com sucesso!</p>
               <img src="img/check.png" alt="imagem de confirmação">
               <i class="fa fa-check-circle"></i>
           `;
           document.querySelector('.panel-body').appendChild(confirmationMessage);
        });
    } else {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Por favor, selecione um método de pagamento.",
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function formataCardNumber(input) {
    // Remove tudo o que não for número
    let value = input.value.replace(/\D/g, '');

    // Aplica a formatação do tipo 0000 0000 0000 0000
    value = value.replace(/(\d{4})(\d{1,4})/, '$1 $2');
    value = value.replace(/(\d{4})(\d{1,4})(\d{1,4})/, '$1 $2 $3');
    value = value.replace(/(\d{4})(\d{1,4})(\d{1,4})(\d{1,4})/, '$1 $2 $3 $4');

    // Limita a quantidade de números para 16
    input.value = value.substring(0, 19); // 16 números + 3 espaços
}

function formataDataValidade(input) {
    // Remove tudo o que não for número
    let value = input.value.replace(/\D/g, '');

    // Aplica a formatação do tipo MM/YY
    if (value.length >= 3) {
        value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    }

    // Limita a quantidade de números para 4 (2 para mês e 2 para ano)
    input.value = value.substring(0, 5); // 2 números para o mês, 1 para o separador e 2 para o ano
}


