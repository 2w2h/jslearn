#!/usr/bin/env node
const mongo = require('mongoose');

const [, , ...args] = process.argv;
if (args.length > 0) {
    console.log(`Args: ${args}`);
}

async function connect() {
    await mongo.connect('mongodb://127.0.0.1/myapp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = {
  args,
  con: connect
};
