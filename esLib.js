var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info'
});

var indexName = "awrecommendation";

/**
 * Delete an existing index
 */
function deleteIndex() {
  return elasticClient.indices.delete({
    index: indexName
  });
}
exports.deleteIndex = deleteIndex;

/**
 * create the index
 */
function initIndex() {
  console.log("create index");
  return elasticClient.indices.create({
    index: indexName
  });
}
exports.initIndex = initIndex;

/**
 * check if the index exists
 */
function indexExists() {

  console.log("check if index exists");
  return elasticClient.indices.exists({
    index: indexName
  });
}
exports.indexExists = indexExists;

function initMapping() {
  console.log("put mapping to index");
  return elasticClient.indices.putMapping({
    index: indexName,
    type: "javadoc",
    body: {
      properties: {
        title: {
          type: "text",
          "similarity": "BM25"
        },
        text: {
          type: "text",
          "similarity": "BM25"
        },
        url: {
          type: "text"
        },
        suggest: {
          type: "completion",
          analyzer: "english",
          search_analyzer: "english"
          // payloads: true
        }
      }
    }
  });
}
exports.initMapping = initMapping;

function addDocument(document) {
  return elasticClient.index({
    index: indexName,
    type: "document",
    body: {
      title: document.title,
      content: document.content,
      suggest: {
        input: document.title.split(" "),
        // output: document.title,
        // payload: document.metadata || {}
      }
    }
  });
}
exports.addDocument = addDocument;

function getSuggestions(input) {
  return elasticClient.search({
    index: indexName,
    body: {
      "size": 10,
      "query": {
        "multi_match": {
          "query": input,
          "fields": ["title", "text"]
        }
      }
    }
  })
}
exports.getSuggestions = getSuggestions;

function bulkAdd(document) {
  return elasticClient.bulk({
    body: document
  });
}
exports.bulkAdd = bulkAdd;
