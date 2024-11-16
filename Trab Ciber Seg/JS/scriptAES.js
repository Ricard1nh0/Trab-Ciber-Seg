<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
    // Chave secreta para criptografia AES
    const secretKey = "minha-chave-super-secreta";

    // Função para formatar o número do cartão
    const formatCardNumber = (input) => {
        input.value = input.value.replace(/\D/g, "") // Remove caracteres não numéricos
            .replace(/(.{4})/g, "$1 ") // Adiciona espaço a cada 4 dígitos
            .trim(); // Remove espaços extras
    };

    // Função para formatar a data de validade
    const formatExpiryDate = (input) => {
        input.value = input.value.replace(/\D/g, "") // Remove caracteres não numéricos
            .replace(/^(\d{2})(\d{0,2})/, "$1/$2") // Adiciona barra após o mês
            .trim(); // Remove espaços extras
    };

    // Função para limitar o CVV a no máximo 4 dígitos
    const formatCvv = (input) => {
        input.value = input.value.replace(/\D/g, "").substring(0, 4);
    };

    // Função de validação dos campos
    const validateFields = () => {
        const cardName = document.getElementById("cardholder").value.trim();
        const cardNumber = document.getElementById("cardnumber").value.trim().replace(/\s/g, "");
        const cardExpiry = document.getElementById("date").value.trim();
        const cardCvv = document.getElementById("verification").value.trim();

        if (!cardName || !/^[a-zA-Z\s]+$/.test(cardName)) {
            alert("Nome inválido! Preencha corretamente.");
            return false;
        }

        if (!cardNumber || cardNumber.length !== 16) {
            alert("Número do cartão inválido! Deve conter 16 dígitos.");
            return false;
        }

        if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
            alert("Data de validade inválida! Use o formato MM/AA.");
            return false;
        }

        if (!cardCvv || cardCvv.length < 3 || cardCvv.length > 4) {
            alert("CVV inválido! Deve conter 3 ou 4 dígitos.");
            return false;
        }

        return true;
    };

    // Adiciona eventos de formatação aos campos
    document.getElementById("cardnumber").addEventListener("input", (e) => formatCardNumber(e.target));
    document.getElementById("date").addEventListener("input", (e) => formatExpiryDate(e.target));
    document.getElementById("verification").addEventListener("input", (e) => formatCvv(e.target));

    // Lógica do botão "Next Step"
    document.querySelector(".next-btn").addEventListener("click", () => {
        // Valida os campos
        if (!validateFields()) return;

        // Capturar os dados preenchidos
        const cardName = document.getElementById("cardholder").value.trim();
        const cardNumber = document.getElementById("cardnumber").value.trim().replace(/\s/g, "");
        const cardExpiry = document.getElementById("date").value.trim();
        const cardCvv = document.getElementById("verification").value.trim();

        // Dados do cartão a serem criptografados
        const cardData = JSON.stringify({ cardName, cardNumber, cardExpiry, cardCvv });

        // Criptografar os dados com AES
        const encryptedData = CryptoJS.AES.encrypt(cardData, secretKey).toString();
        console.log("Dados Criptografados:", encryptedData);

        // Descriptografar os dados com AES
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log("Dados Descriptografados:", decryptedData);

        alert("Compra confirmada com sucesso!");

        // Redirecionar para a página de confirmação
        window.location.href = "compra-confirmada.html";
    });