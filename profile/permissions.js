const PROTECTED_URLS = [
  [
    "/", "GET", "res:profile", "scopes:read"
  ],
  [
    "/", "POST", "res:profile", "scopes:write"
  ],
  [
    "/", "PUT", "res:profile", "scopes:write"
  ],
  [
    "/", "DELETE", "res:profile", "scopes:write"
  ]
];

const NOT_PROTECTED = [
  "/landing-profile", 
];

export {
  PROTECTED_URLS,
  NOT_PROTECTED
};