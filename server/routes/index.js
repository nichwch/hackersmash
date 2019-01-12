var express = require( 'express' ),
    router  = express.Router(),
    fs      = require( 'fs' ) ;
// Read each file in the routes directory
fs.readdirSync( __dirname ).forEach( function( route ) {
  // Strip the .js suffix
  route = route.split( '.' )[ 0 ] ;
  // Ignore index (i.e. this file)
  if ( route === 'index' ) return ;
  console.log( 'Loading route ' + route + '...' ) ;
  // Mount router
  router.use( '/' + route, require( './' + route + '.js' ) ) ;
} ) ;
module.exports = router ;
