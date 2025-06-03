const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories); 

});


app.post("/repositories", (request, response) => {
   
  const {title, url, techs} = request.body;

  const newRepo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(newRepo);

  response.status(201).json(newRepo);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;

  const repoIndex = repositories.findIndex(repo => repo.id === id );
  
  if (repoIndex < 0) {
    return response.status(400).json('error: Id not found')
  }

  const newRepo = {
    id: id,
    title,
    url,
    techs,
    likes: repositories[repoIndex].likes
  }

  repositories[repoIndex] = newRepo;
  return response.json(newRepo);

});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const repoIndex = repositories.findIndex(repo => repo.id === id );

  if (repoIndex < 0) {
    return response.status(400).json('error: Id not found')
  }

  repositories.splice(repoIndex, 1);

  return response.json('Deleted repository successfully');

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repo => repo.id === id );

  if (repoIndex < 0) {
    return response.status(400).json('error: Id not found')
  }

  repositories[repoIndex].likes += 1;

  return response.json(repositories[repoIndex]);
});

module.exports = app;
