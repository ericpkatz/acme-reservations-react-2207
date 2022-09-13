const express = require('express');
const app = express();
const path = require('path');
const { conn, seed } = require('./db');

app.use('/dist', express.static('dist'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use('/api', require('./api'));

const port = process.env.PORT || 3000;

const init = async()=> {
  try {
    console.log('seeding data');
    await conn.sync({ force: true });
    await seed();
    console.log('data is seeded');
    //sync database and seed data here
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
}

init();
