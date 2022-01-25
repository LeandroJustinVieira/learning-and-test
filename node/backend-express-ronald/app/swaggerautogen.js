const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger-output.json'
const endpointsFiles = ['./app.ts']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require('./app.ts')
})