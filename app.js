const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
const librosRouter = require("./routes/libros");
const errorHandler = require("./middlewares/errorHandler");

const validadorToken = auth({
  audience: 'http://localhost:3000/libros',
  issuerBaseURL: 'https://dev-48g2drh4nensuvyp.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

const app = express();
app.use(express.json());

app.use("/libros",validadorToken ,librosRouter);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`);
});
