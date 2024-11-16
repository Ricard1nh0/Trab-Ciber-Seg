<script src="https://cdn.jsdelivr.net/npm/node-rsa@1.1.1/build/NodeRSA.min.js"></script>

    // Configuração da chave RSA
    const rsa = new NodeRSA({ b: 512 }); // Gera um par de chaves com 512 bits
    const publicKey = rsa.exportKey('public');
    const privateKey = rsa.exportKey('private');
    
    console.log("Chave Pública:", publicKey);
    console.log("Chave Privada:", privateKey);

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

        // Criptografar os dados com a chave pública
        const encryptedData = new NodeRSA(publicKey).encrypt(cardData, "base64");
        console.log("Dados Criptografados:", encryptedData);

        // Descriptografar os dados com a chave privada
        const decryptedData = new NodeRSA(privateKey).decrypt(encryptedData, "utf8");
        console.log("Dados Descriptografados:", JSON.parse(decryptedData));

        alert("Compra confirmada com sucesso!");

        // Redirecionar para a página de confirmação
        window.location.href = "compra-confirmada.html";
    });

