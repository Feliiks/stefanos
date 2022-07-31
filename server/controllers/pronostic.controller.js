const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_SECRET });

const pronosticController = () => {};

// GET _______________________________________________________________
pronosticController.getAll = async (req, res) => {
    try {
        const databaseId = process.env.NOTION_DATABASE_ALL_ID;
        const pronostics = await notion.databases.query({
            database_id: databaseId
        });

        let finalResults = []

        await Promise.all(pronostics.results.map(async pronostic => {
            let obj = {}

            let obj_name = await notion.pages.properties.retrieve({ page_id: pronostic.id, property_id: pronostic.properties.title.id})
            if (obj_name.results[0].title.text.content !== "undefined") {
                obj.title = obj_name.results[0].title.text.content
            }

            let obj_content = await notion.pages.properties.retrieve({ page_id: pronostic.id, property_id: pronostic.properties.content.id})
            if (obj_content.results[0].rich_text.text.content !== "undefined") {
                obj.content = obj_content.results[0].rich_text.text.content
            }

            let obj_image = await notion.pages.properties.retrieve({ page_id: pronostic.id, property_id: pronostic.properties.image.id})
            if (obj_image.files[0].file !== "undefined") {
                obj.image = obj_image.files[0].file
            }

            if (pronostic.created_time !== "undefined") {
                obj.created_at = pronostic.created_time
            }

            return finalResults.push(obj)
        }))

        res.status(200)
        res.send({ success: true, finalResults })
    } catch (err) {
        console.log(err)
        res.status(400)
        res.send({ success: false, message: "No pronostic found." })
    }
}

pronosticController.getGC = async (req, res) => {
    try {
        const databaseId = process.env.NOTION_DATABASE_GC_ID;
        const pronostics = await notion.databases.query({
            database_id: databaseId
        });

        let finalResults = []

        await Promise.all(pronostics.results.map(async pronostic => {
            let obj = {}

            let obj_name = await notion.pages.properties.retrieve({ page_id: pronostic.id, property_id: pronostic.properties.title.id})
            if (obj_name.results[0].title.text.content !== "undefined") {
                obj.title = obj_name.results[0].title.text.content
            }

            let obj_content = await notion.pages.properties.retrieve({ page_id: pronostic.id, property_id: pronostic.properties.content.id})
            if (obj_content.results[0].rich_text.text.content !== "undefined") {
                obj.content = obj_content.results[0].rich_text.text.content
            }

            let obj_image = await notion.pages.properties.retrieve({ page_id: pronostic.id, property_id: pronostic.properties.image.id})
            if (obj_image.files[0].file !== "undefined") {
                obj.image = obj_image.files[0].file
            }

            if (pronostic.created_time !== "undefined") {
                obj.created_at = pronostic.created_time
            }

            return finalResults.push(obj)
        }))

        res.status(200)
        res.send({ success: true, finalResults })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: "No pronostic found." })
    }
}


module.exports = pronosticController;