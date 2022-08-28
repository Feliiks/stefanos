import api from "../lib/api"


const PaymentService = () => {};

PaymentService.getCheckoutSession = async (sessionId) => {
    return await api.get(`/payments/checkout-session/${sessionId}`)
}

PaymentService.createCheckoutSession = async (stripePriceId, subscriptionId, subscriptionMode, username) => {
    return await api.post("/payments/checkout-session", {
        price_id: stripePriceId,
        subscription_id: subscriptionId,
        mode: subscriptionMode,
        username: username
    })
}

export default PaymentService