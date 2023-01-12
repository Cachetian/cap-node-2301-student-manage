const cds = require('@sap/cds')
const express = require('express')
cds.env.protocols = {
  'odata-v4': { path: '/odata/v4' }
}
cds.once('bootstrap', (app)=>{
  app.use('/resources', express.static('../sapui5-sdk/1.108.0/resources'))
  app.use('/test-resources', express.static('../sapui5-sdk/1.108.0/test-resources'))
})

module.exports = cds.server