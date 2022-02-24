const PROTECTED_URLS = [
  [
    "/", "GET", "res:post", "scopes:read"
  ],
  [
    "/", "POST", "res:post", "scopes:write"
  ],
  [
    "/", "PUT", "res:post", "scopes:write"
  ],
  [
    "/", "DELETE", "res:post", "scopes:write"
  ]
];

const NOT_PROTECTED = [
  "/landing-post", 
];

export {
  PROTECTED_URLS,
  NOT_PROTECTED
};