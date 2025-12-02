const jsonServer = require("json-server-relationship");

const app = jsonServer.create();
const router = jsonServer.router("db.json");

const port = process.env.PORT || 4000;

// /!\ Bind the router db to the app
app.db = router.db;

// Make sure to use the default middleware
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(jsonServer.bodyParser);

app.use(router);
app.listen(port, () => {
  console.log("Server is ready for requests on port " + port);
});

module.exports = app;
