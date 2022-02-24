const PROTECTED_URLS = [
  [
    "/", "GET", "res:wallet", "scopes:read"
  ],
  [
    "/", "POST", "res:wallet", "scopes:write"
  ],
  [
    "/", "PUT", "res:wallet", "scopes:write"
  ],
  [
    "/", "DELETE", "res:wallet", "scopes:write"
  ]
];

const NOT_PROTECTED = [
  "/landing-wallet", 
];

export {
  PROTECTED_URLS,
  NOT_PROTECTED
};