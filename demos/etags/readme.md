# ETAG

## Pre-requis
* Node-js
* Express
* MongoDB

## 1 - Création de projet
```
npm init
```

## 2 - Installer Express
```
npm i express
```

## 3 - Créer un fichier app.js
```
  app.get('/todos', async (req, res) => {
    try {
      const todos = await Todo.find();
      const todoJson = JSON.stringify(todos);
  
      // Calcul de l'ETag en fonction du contenu de la réponse
      const hash = etag(todoJson);
  
      // Vérifier si l'ETag correspond à l'ETag envoyé par le client
      if (req.headers['if-none-match'] === hash) {
        return res.status(304).send(); // Pas de modifications, renvoyer 304 Not Modified
      }
  
      res.setHeader('ETag', hash);
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).send('Erreur lors de la récupération des tâches');
    }
  });
  app.post('/todos', async (req, res) => {
    try {
      const newTodo = new Todo({
        title: req.body.title,
        completed: req.body.completed || false
      });
  
      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
    } catch (err) {
      res.status(500).send('Erreur lors de la création de la tâche');
    }
  });
  app.put('/todos/:id', async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).send('Tâche non trouvée');
      }
  
      // Vérifier l'ETag envoyé par le client dans le header 'If-Match'
      const clientETag = req.headers['if-match'];
      const currentETag = etag(JSON.stringify(todo));
      console.log(clientETag);
      console.log(currentETag);
      if (clientETag !== currentETag) {
        return res.status(412).send('Precondition Failed: ETag mismatch'); // 412 Precondition Failed
      }
  
      // Si l'ETag correspond, on peut procéder à la mise à jour
      todo.title = req.body.title || todo.title;
      todo.completed = req.body.completed || todo.completed;
  
      const updatedTodo = await todo.save();
  
      // Calcul de l'ETag pour la nouvelle version de la tâche
      const updatedJson = JSON.stringify(updatedTodo);
      const newETag = etag(updatedJson);
  
      res.setHeader('ETag', newETag);
      res.status(200).json(updatedTodo);
    } catch (err) {
      res.status(500).send('Erreur lors de la mise à jour de la tâche');
    }
  });
  app.get('/todos/:id', async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      
      if (!todo) {
        return res.status(404).send('Tâche non trouvée');
      }
  
      // Convertir la tâche en JSON et calculer l'ETag
      const todoJson = JSON.stringify(todo);
      const hash = etag(todoJson);
  
      // Vérifier si l'ETag correspond à l'ETag envoyé par le client
      if (req.headers['if-none-match'] === hash) {
        return res.status(304).send(); // Pas de modifications, renvoyer 304 Not Modified
      }
  
      res.setHeader('ETag', hash);
      res.status(200).json(todo);
    } catch (err) {
      res.status(500).send('Erreur lors de la récupération de la tâche');
    }
  });
  module.exports = app;
  ```

## 4 - créer le fichier server.js
```
const http = require('http');
const app = require('./app');
app.set('port',process.env.PORT || 3000);
 const server = http.createServer(app);
 server.listen(process.env.PORT || 3000);
 server.on('listening', () => {
    const address = server.address();
    //const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on 3000');
  });
```  

5 - Test avec postman

* Création d'une ressource
```
curl --location 'http://localhost:3000/todos' \
--header 'Content-Type: application/json' \
--data '{
    "title":"Le livre de l'\''ingenieur bidouilleur"
}'
```
* Voir le détail d'une ressource
```
curl --location 'http://localhost:3000/todos/673dc83d07d213b6344df5a5'
```

* Modifier une ressource avec l'etag
```
curl --location --request PUT 'http://localhost:3000/todos/673dc83d07d213b6344df5a5' \
--header 'If-Match: "6a-dDE0yKijNRUjkrOD0iBKi572Lpg"' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Les livres des ingénieurs bidoulleurs"
}'
```

