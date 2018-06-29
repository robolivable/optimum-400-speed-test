const Twitter = require('twitter')
const speed_test = require('speedtest-net')
const test = speed_test({maxTime: process.env.MAX_TIME})

const consumer_key = process.env.TWITTER_CONSUMER_KEY
const consumer_secret = process.env.TWITTER_CONSUMER_SECRET
const access_token_key = process.env.TWITTER_TOKEN_KEY
const access_token_secret = process.env.TWITTER_TOKEN_SECRET
const screen_name = process.env.TWITTER_SCREEN_NAME

const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
})

test.on('data', data => {
  const status = `Download: ${data.speeds.download} Mbps -- ` +
    `Upload: ${data.speeds.upload} Mbps -- ` +
    `Ping: ${data.server.ping} ms -- #Optimum #speedtest`
  client.post('statuses/update', {status}, (err, tweet, response) => {
    if (err) {
      console.error(status + ` => failed to publish: ${JSON.stringify(err)}`)
      return
    }
    console.log(status + ` => published! - ${JSON.stringify(response)}`)
  })
})

test.on('error', err => {
  console.error(err)
})
