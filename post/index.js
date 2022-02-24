 import express from 'express'
 const app = express()
 const port = 6000

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

const post = [
 {
  title : 'Titre du post',
  Author : 'JaJa',
  createdDate : 'TODAY',
  API : 'API Post :6000'
}
]


app.get('/landing-post', async (req, res) => {
  res.send({landing : true})
  
}) 

app.get('/', async (req, res) => {
   res.send(post)
 })

 app.post('/', async (req, res) => {
     let createdDate = " February 17 2022 "
     let postCreated = {
        title : 'New post title',
        Author : 'JaJa',
        createdDate : 'TODAY',
        API : 'API Post :6000 - Same'
     }
    res.send(postCreated)
 })

 
 app.put('/', async (req, res) => {
   res.send( {...post, updated : true} )
})

app.delete('/', async (req, res) => {
   res.send( { deleted : true} ) 
 })

