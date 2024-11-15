function confirmPurchase() {
    const cardName = document.getElementById("cardName").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const cardExpiry = document.getElementById("cardExpiry").value;
    const cardCvv = document.getElementById("cardCvv").value;

    // Aqui, você pode futuramente adicionar a criptografia AES ou RSA nos dados do cartão
    // Exemplo (simulação):
    // let encryptedCardNumber = encryptAES(cardNumber); // Função de criptografia AES

    alert("Compra confirmada! (Dados do cartão não foram enviados neste exemplo)");
    
    // Limpar formulário
    document.getElementById("paymentForm").reset();
}