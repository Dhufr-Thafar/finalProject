const express = require('express');
const cors = require(`cors`)
const router = require("./routes");

const app = express();
app.use(cors())
app.use(express.json())

app.use("/", express.static("public"));
app.use("/", router);

port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});