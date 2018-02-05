// millisecond
module.exports.HALF_HOUR_MILLI_SECONDS = 30 * 60 * 1000

module.exports.TWO_HOURS_MILLI_SECONDS = 2 * 60 * 60 * 1000

module.exports.FOUR_HOURS_MILLI_SECONDS = 4 * 60 * 60 * 1000

module.exports.TWO_DAYS_MILLI_SECONDS = 2 * 24 * 60 * 60 * 1000

module.exports.ONE_WEEK_MILLI_SECONDS = 7 * 24 * 60 * 60 * 1000

module.exports.ONE_MONTH_MILLI_SECONDS = 30 * 24 * 60 * 60 * 1000

module.exports.TEN_MINUTE_MILLI_SECONDS = 10 * 60 * 1000

// second
module.exports.TWO_HOURS_SECONDS = 2 * 60 * 60
module.exports.FOUR_HOURS_SECONDS = 4 * 60 * 60
module.exports.ONE_WEEK_SECONDS = 7 * 24 * 60 * 60
module.exports.ONE_MONTH_SECONDS = 30 * 24 * 60 * 60
module.exports.NINETY_DAY_SECONDS = 90 * 24 * 60 * 60
module.exports.TWO_MINUTE_SECONDS = 2 * 60

module.exports.TEN_MINUTE_SECONDS = 10 * 60

module.exports.TEN_MINUTE = 10

module.exports.AUTH_IMAGE_CODE_EXPIRED_TIME_SECONDS = module.exports.TEN_MINUTE_SECONDS

module.exports.currentTimeMillis = function() {
  return new Date().getTime()
}

module.exports.getTimeStampInFuture = function(time) {
  return new Date().getTime() + time
}
