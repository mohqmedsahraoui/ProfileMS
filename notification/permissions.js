const PROTECTED_URLS = [
  [
    "/", "GET", "res:notification", "scopes:read"
  ],
  [
    "/", "POST", "res:notification", "scopes:write"
  ],
  [
    "/", "PUT", "res:notification", "scopes:write"
  ],
  [
    "/", "DELETE", "res:notification", "scopes:write"
  ]
];

const NOT_PROTECTED = [
  "/landing-notification", 
];

export {
  PROTECTED_URLS,
  NOT_PROTECTED
};