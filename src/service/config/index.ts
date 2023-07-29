let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = 'http://codercba.com:4000'
} else {
  BASE_URL = 'http://codercba.com:5000'
}

export const TIMEOUT = 10000
export { BASE_URL }
