import api from "../lib/api"


const SubscriptionService = () => {};

SubscriptionService.getTypes = async () => {
    return await api.get("/subscriptions/types")
}

SubscriptionService.create = async (username, subscriptionId, stripeSubscriptionId) => {
    return await api.post("/subscriptions", {
        username: username,
        subscription_id: subscriptionId,
        stripe_subscription_id: stripeSubscriptionId
    })
}

SubscriptionService.delete = async (subId) => {
    return await api.delete(`/subscriptions/${subId}`)
}

export default SubscriptionService