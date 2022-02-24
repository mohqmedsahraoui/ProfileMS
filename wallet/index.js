 import express from 'express'
 const app = express()
 const port = 8000

// const Permissions = require("./permissionsConfig");
import Permissions from './permissionsConfig.js'
import { PROTECTED_URLS, NOT_PROTECTED} from './permissions.js' 
import requireLogin from './requireLogin.js'

 


const PERMISSIONS = new Permissions(PROTECTED_URLS).notProtect(
  ...NOT_PROTECTED
); 


app.use((req, res, next) => {
  return requireLogin(req, res, next, PERMISSIONS);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const wallet = [
    {
        owner : 'Mohamed',
        creditAmount : '300 BTC',
        valueUSD : '11 282 190 $',
        lastWithdraw : 'Yesterday',
        withdrawAmount : '2 BTC'
      
    }
]


app.get('/landing-wallet', async (req, res) => {
  res.send({landing : true})
  
}) 

app.get('/', async (req, res) => {
   res.send(wallet)
 })

 app.post('/', async (req, res) => {
     let createdDate = " February 17 2022 "
     let walletPost =  {
      owner : 'Mohamed',
      creditAmount : '300 BTC',
      valueUSD : '11 282 190 $',
      lastWithdraw : 'Yesterday',
      withdrawAmount : '2 BTC',
      type : 'POSTED',
      createdDate : createdDate,
  }
    res.send(walletPost)
 })

 
 app.put('/', async (req, res) => {
  res.send({...profile, updated : true})
})

app.delete('/', async (req, res) => {
  res.send({ deleted : true})
 })

