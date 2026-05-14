const app = require('./app')
const port = 8000

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`)
})