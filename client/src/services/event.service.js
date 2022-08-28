import api from "../lib/api"


const EventService = () => {};

EventService.getAll = async () => {
    return await api.get("/events")
}

EventService.create = async (tournament, start, end, priceId) => {
    return await api.post("/events", {
        tournament: tournament,
        starts: start,
        ends: end,
        stripe_price_id: priceId
    })
}

EventService.delete = async (eventId) => {
    return await api.delete(`/events/${eventId}`)
}

export default EventService