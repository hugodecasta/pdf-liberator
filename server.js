const fetch = require('node-fetch')
const fs = require('fs')

const cache_dir = __dirname + '/cache'
if (!fs.existsSync(cache_dir)) fs.mkdirSync(cache_dir)

async function get_from_cache(cached_name) {
    const path = cache_dir + '/' + cached_name
    if (fs.existsSync(path)) return fs.promises.readFile(path)
    return null
}

async function write_to_cache(cached_name, blob) {
    const path = cache_dir + '/' + cached_name
    return fs.promises.writeFile(path, blob)
}

module.exports = (app) => {

    app.get('/pdf/*', async (req, res) => {
        const url = req.originalUrl.replace('/pdf/', '')

        const cached_name = url.replace('.pdf', '').replace(/:|\/|\.|#/g, '_') + '.pdf'
        const cached = await get_from_cache(cached_name)
        if (cached) return res.send(cached)

        const data = await fetch(url)
        const blob = await data.buffer()
        write_to_cache(cached_name, blob)

        res.send(blob)
    })

}