const { createProxyMiddleware } = require('http-proxy-middleware');

const TARGET = 'https://platform-dev.smartshift.com';

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: TARGET,
      changeOrigin: true,
      secure: false,
      onProxyReq: function (request) {
        request.setHeader('origin', TARGET);
      },
    })
  );

  app.get('/oidc-config', function (req, res, next) {
    res.send({
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      response_type: process.env.REACT_APP_RESPONSE_TYPE,
      post_logout_redirect_uri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI,
      scope: process.env.REACT_APP_CLIENT_SCOPE,
      authority: process.env.REACT_APP_AUTHORITY,
      silent_redirect_uri: process.env.REACT_APP_SILENT_REDIRECT_URI,
      automaticSilentRenew: true,
    });
  });
};
