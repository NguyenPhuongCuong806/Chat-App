import express from 'express'

const configViewEJS = (app) => {
    app.use(express.static('./src/public'))
    app.set('views', './src/views')
    app.set('view engine', 'ejs')
}

export default configViewEJS;