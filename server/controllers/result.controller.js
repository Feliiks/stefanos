const Result = require("../models/Result")

const resultController = () => {};

// GET _______________________________________________________________
resultController.getAll = async (req, res) => {
    try {
        const results = await Result.find()

        res.status(200)
        res.send({ success: true, results })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: "Aucun résultat trouvé." })
    }
}


module.exports = resultController;