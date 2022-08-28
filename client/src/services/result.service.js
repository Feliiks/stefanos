import api from "../lib/api"


const ResultService = () => {};

ResultService.getAll = async () => {
    return await api.get("/results/all")
}

export default ResultService