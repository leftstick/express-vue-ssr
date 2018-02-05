export const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const isTest = process.env.NODE_ENV === 'test'

export const isStage = process.env.NODE_ENV === 'stage'

export const isProduction = process.env.NODE_ENV === 'production'
