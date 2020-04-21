const mongoose = require("mongoose");

const express = require('express')

const bodyParser = require('body-parser')

const uuidv4 = require("uuid/v4");

const redis = require('redis');

const logger = require("./middleware/logger");

const app = express()

app.use(bodyParser())

const port = process.env.PORT || 5000

const client = redis.createClient({ host: 'localhost', port: 6379 });

const connects = async () => {
    client.on('connect', () => {
    // logger.info('redis client connected');
    logger.info('redis connected')
  });
};

connects();

connect = async () => {
  mongoose
    .connect("mongodb+srv://vivek:12345@cluster0-xkyxa.mongodb.net/Thandra?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => logger.info("MongoDB Connected..."))
    .catch(err => logger.error(err));
};

connect();

app.use((request, response, next) => {
  let requestId = "";
  if (request.header("requestId")) {
    requestId = request.header("requestId");
  } else {
    requestId = uuidv4();
  }
  response.setHeader("requestId", requestId);
  // logger.info(`${request.method} ${request.url} [trace_id:${requestId}]`);
  next();
});

require("./route")(app);

app.get("*", (request, response) => {
  response.send({ message: "Sorry, this is an invalid URL." });
});

app.post("*", (request, response) => {
  response.send({ message: "Sorry, this is an invalid URL." });
});

app.patch("*", (request, response) => {
  response.send({ message: "Sorry, this is an invalid URL." });
});

app.use((request, response, err) => {
  response.status(404).send({ message: "Not found" });
  // logger.error("error middleware", err);
});
app.listen(port, () => {
  logger.info(`light it up on given port ${port}`)
})


// module.exports = { connect };
