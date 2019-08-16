const PORT = 3001;
import { createServer } from 'http';
import { Client } from 'pg';

const dbConnection = new Client({
  connectionString: 'postgres://postgres:tes5skyrim@localhost/pocket_campaign'
});

const server = createServer((request, response) => {
  if (request.url === '/' && request.method === 'GET') {
    response.end(
      `<html><head></head><body><div>Node server created, worked and answered ${
        request.url
      }</div></body></html>`
    );

    return;
  }

  if (request.url === '/decks' && request.method === 'GET') {
    dbConnection
      .query('SELECT * FROM decks')
      .then(decks => {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(JSON.stringify(decks.rows));
      })
      .catch(err => {
        console.log(err);
      });

    return;
  }
});

server.listen({ port: PORT }, () => {
  dbConnection.connect().then(() => {
    console.log(`Server started on ${PORT} port`);
  });
});
