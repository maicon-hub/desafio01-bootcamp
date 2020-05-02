const express = require ('express');

const server = express();

server.use(express.json());

const projects = [];

function projectIdExists (req, res, next){
  const {id} = req.params;
  const project = projects.find(p => p.id == id);

  if(!project){
    return res.status(400).json({ error: "Project not found"})
  }

  return next();
}

function logRequests(req, res, next) {

  console.count("Número de requisições");

  return next();
}

server.use(logRequests);

server.post('/projects', (req, res) => {
  const {id, title} = req.body

  const project ={
    id,
    title,
    task: []
  }

  projects.push(project);

  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', projectIdExists,  (req, res) => {
  const {id} = req.params;
  const {title} =req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', projectIdExists, (req, res) => {
  const {id} = req.params;

  const index = projects.findIndex(p => p.id == id);

  projects.splice(index, 1);

  return res.send();
});

server.post('/projects/:id/task', projectIdExists, (req, res) => {
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find(p => p.id == id);

  project.task.push(title);

  return res.json(project)
})

server.listen(3000);