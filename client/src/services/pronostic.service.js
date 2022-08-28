import api from "../lib/api"


const PronosticService = () => {};

PronosticService.getAll = async () => {
    return await api.get("/pronostics/all")
}

PronosticService.getGrandChelem = async () => {
    return await api.get("/pronostics/gc")
}

export default PronosticService