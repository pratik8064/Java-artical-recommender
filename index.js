const express = require('express');
var elasticsearchModule = require('elasticsearch');
var elasticsearch = require('./esLib');
var questions = require('./questions.js');
const fs = require('fs');
const app = express();


//const verify = require('./verify');
//const searchData = require('./search');

const PORT = 3000;

const client = new elasticsearchModule.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});

client.ping({ requestTimeout: 30000 }, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('Everything is ok');
  }
});


/* const bulkIndex = function bulkIndex(index, type, data) {
  let bulkBody = [];

  data.forEach(item => {
    bulkBody.push({
      index: {
        _index: index,
        _type: type,
        _id: item.id
      }
    });

    bulkBody.push(item);
  });

  client.bulk({ body: bulkBody })
    .then(response => {
      let errorCount = 0;
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error);
        }
      });
      console.log(
        `Successfully indexed ${data.length - errorCount}
         out of ${data.length} items`
      );
    })
    .catch(console.err);
};

async function indexData() {
  const articlesRaw = await fs.readFileSync('./data2.json');
  const articles = JSON.parse(articlesRaw);
  console.log(`${articles.length} items parsed from data file`);
  bulkIndex('library', 'article', articles);
};

//indexData();
//verify();
 */



/* main page */
app.get('/', (req, res) => {
  //console.log("got my request");
  res.sendFile(__dirname + '/index.html');
});

app.post('/addAllDocuments', function (req, res, next) {
  console.log("got add doc request");
  elasticsearch.indexExists().then(function (exists) {
    if (exists) {
      return elasticsearch.deleteIndex();
    }
  }).then(function () {
    return elasticsearch.initIndex().then(elasticsearch.initMapping()).then(function (resp) {
      //console.log("got in afer mapping: add data now\n");
      //console.log(resp);

      let bulkAddDocs = getJsonDataToIndex([]);

      //console.log("--------------------");
      //console.log(bulkAddDocs);
      //console.log("--------------------");
      return elasticsearch.bulkAdd(bulkAddDocs);
    }, function (err) {
      console.log(err);
    });

  }).then((resp) => res.json(resp), (err) => res.err(err));
});


function getJsonDataToIndex(bulk_request) {
  let curr = []
  curr = JSON.parse(fs.readFileSync("data.json"));

  for (let i = 0; i < curr.length; i++) {
    bulk_request.push({ index: { _index: 'awrecommendation', _type: 'javadoc', _id: i } });
    bulk_request.push(curr[i]);
  }
  return bulk_request;

}



app.post('/search', function (req, res, next) {
  let data = [];
  for (let i = 0; i < questions.length; i++) {
    //console.log("\ntokenized string : ");
    //console.log(questions[i]);
    // order to push result in data?
    data.push(elasticsearch.getSuggestions(questions[i]));
  }
  Promise.all(data).then(function (values) {
    values.forEach(element => {
    });
    res.json(values);
  })
});




app.listen(PORT, function () {
  console.log('Server is running on PORT:', PORT);
});
