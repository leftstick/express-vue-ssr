module.exports.isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

module.exports.isTest = process.env.NODE_ENV === 'test'

module.exports.isStage = process.env.NODE_ENV === 'stage'

module.exports.isProduction = process.env.NODE_ENV === 'production'
