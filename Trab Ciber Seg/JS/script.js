function confirmPurchase() {
    const cardName = document.getElementById("cardholder").value.trim();
    const cardNumber = document.getElementById("cardnumber").value.trim().replace(/\s/g, "");
    const cardExpiry = document.getElementById("expiryDate").value.trim();
    const cardCvv = document.getElementById("verification").value.trim();

    if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Preencha todos os campos corretamente.",
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }

    const cardData = JSON.stringify({ cardName, cardNumber, cardExpiry, cardCvv });


    const publicKey = `
    -----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx8Nv8okqNZW8pG46gE5G
    aF1OQmN+VVfL1pi8clEGp6XlkUu5DzHxAHR02ZFWbBj3ChSNp2RYt7k+Y3t6qXpT
    JRxFK9DQOW1khW1FnT2m8RB3+k8Hw7G8nXN5NOrAfwTw6xtDqZFc3+nDx9MRggZg
    kWOpUCkCbh8H7P5nWbiNqICq3DZZAlcrgYNTV9JlJEB12UWaWx6vPh2MeHGl6kdn
    U2FcJlzMHTGZ8TsbCWe5BjjDdD1twciJoTch6MZ1upNYhYZ5Zcse6Cp5Wi/FU9oR
    DtpRt5mhw1UeDXkxumdd6vMQBhFXr9LnQoH+UPdUNwOELU+ORATovECQ91SO7g1O
    wQIDAQAB
    -----END PUBLIC KEY-----
    `;


    const aesKey = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
    console.log("Chave AES Gerada:", aesKey);


    const encryptedAESData = CryptoJS.AES.encrypt(cardData, aesKey).toString();
    console.log("Dados Criptografados com AES:", encryptedAESData);

    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(publicKey);
    const encryptedAESKey = jsEncrypt.encrypt(aesKey);

    if (!encryptedAESKey) {
        console.error("Erro: Falha ao criptografar a chave AES.");
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Falha ao criptografar a chave AES.",
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }
    console.log("Chave AES Criptografada com RSA:", encryptedAESKey);

    
    const decryptedAESKey = aesKey; // Apenas para simulação, normalmente descriptografado com chave privada
    console.log("Chave AES Descriptografada:", decryptedAESKey);


    const bytes = CryptoJS.AES.decrypt(encryptedAESData, decryptedAESKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log("Dados Descriptografados:", decryptedData);



    Swal.fire({
        title: "<h2 style='color:#3085d6;'>Descriptografia Completa</h2>",
        html: `
            <div style="text-align:left; font-size:16px; line-height:1.5; color:#333;">
                <p><strong>Dados Criptografados:</strong> <code>${encryptedAESData}</code></p>
                <p><strong>Chave AES Descriptografada:</strong> <code>${decryptedAESKey}</code></p>
                <p><strong>Dados Descriptografados:</strong></p>
                <pre style="background:#f8f9fa; padding:10px; border-radius:4px; color:#212529; overflow-x:auto;">
    ${JSON.stringify(decryptedData, null, 2)}
                </pre>
            </div>
        `,
        icon: "info",
        confirmButtonText: "Entendido",
        showCloseButton: true,
        allowOutsideClick: false,
        width: 600,
        customClass: {
            popup: 'swal2-shadow'
        }
    }).then(() => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Operação confirmada com sucesso!",
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            document.getElementById("meuFormulario").reset();
        });
    });
    
    
}

function formataCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(\d{1,4})/, '$1 $2');
    value = value.replace(/(\d{4})(\d{1,4})(\d{1,4})/, '$1 $2 $3');
    value = value.replace(/(\d{4})(\d{1,4})(\d{1,4})(\d{1,4})/, '$1 $2 $3 $4');
    input.value = value.substring(0, 19);
}

function formataDataValidade(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 3) {
        value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    }
    input.value = value.substring(0, 5);
}

function displayEncryptionResult(encrypted, decrypted) {
    const resultDiv = document.getElementById("encryptionResult");
    resultDiv.style.display = "block";
    document.getElementById("encryptedData").textContent = encrypted;
    document.getElementById("decryptedData").textContent = JSON.stringify(decrypted, null, 2);
}