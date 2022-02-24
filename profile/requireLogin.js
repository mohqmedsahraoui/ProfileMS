// const fetch = require("node-fetch");
// const jwt = require("jsonwebtoken");

import jwt from 'jsonwebtoken'
import fetch from 'node-fetch'

//const rootPath = "../";
// const {
//   ServerError
// } = require(rootPath + "helpers/Errors");

import config from './config.js'

const {
  clientId, url 
} = config.keycloak;

function requireLogin(
  req,
  res,
  next,
  newPermission
) {

  const {
    authorization
  } = req.headers;

  if (newPermission.isNotProtectedUrl(req)) {
    return next();
  }
  
  if (!authorization) {
   console.log('error here ');
   return {error : true}
  }


  const permission = newPermission.findPermission(req);
  console.log('my perm : ', permission);

  if (!permission) {

    // Logger.error(
    //   "Can not find a permission for: %s %s",
    //   JSON.stringify(req.method, req.originalUrl)
    // );


    // new ServerError(
    //   {
    //     code: "no_permission_code",
    //     message: `Can not find a permission for: ${req.method} ${req.originalUrl}`,
    //     debugMessage: "[permission] Can not find a permission."
    //   }
    // );

    return res.status(401).json({
      message: "no permission found"
    });
  }

  return protectAndCheckPermission(
    req,
    res,
    next,
    permission.resource,
    permission.scope
  );
}

function protectAndCheckPermission(
  req,
  res,
  next,
  resource,
  scope
) {
  const accessToken = req.headers.authorization;
  console.log('my access token :', accessToken);

  let data = new URLSearchParams();

  data.append("grant_type", "urn:ietf:params:oauth:grant-type:uma-ticket");
  data.append("audience", clientId);
  data.append("permission", `${resource}#${scope}`);
  data.append("response_mode", "decision");
  console.log('mu url : ', url);
  return fetch(url, {
    method: "POST",
    body: data.toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `${accessToken}`
    }
  }).then((res) => res.json()).
    then((data) => {
      console.log('my data : ', data);
      if (data.error) {
        return res.status(401).json({
          message: `error check permission ${data.error_description}`,
          error: data.error
        });
      }

      const decodedToken = jwt.decode(`${accessToken}`.replace("Bearer ", ""));
      //console.log(decodedToken);

      res.locals.user = {
        userId: decodedToken.sub,
        roles: decodedToken.realm_access.roles,
        email_verified: decodedToken.email_verified
      }; 
      
      next();
    }).catch((error) => {
      return res.status(500).json({
        message: "[requireLogin] Authorization error",
        error
      });
    });
}

export default requireLogin;