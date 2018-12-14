const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./dist.conf');
const mysql = require('mysql');

const PORT_NUMBER = 8082;

//--------------- MIDDLEWARE ----------------//

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//------------ CREATE A PERSON --------------//

app.post('/person', (req, res) => {
  let formData = req.body;
  connection.query('INSERT INTO personne SET ?', formData, (err, results) => {
    if (err) {
      console.log(
        `Tried to access POST '/person' but something went wrong: ${err}\n`
      );
      res
        .status(500)
        .send(
          `Error while trying to add a new person, are you sure they behaved well ?\n`
        );
    } else {
      console.log(
        `Accessed POST '/person' successfully, another lucky person got added to Santa's list !!`
      );
      res.status(200).send(`Person has been added to Santa's list !!\n`);
    }
  });
});

//------------ DELETE A PERSON --------------//

app.delete('/person/:id', (req, res) => {
  let id = req.params.id;
  id = mysql.escape(id);
  connection.query(`DELETE FROM personne WHERE id=${id}`, (err, results) => {
    if (err) {
      console.log(
        `Tried to access DELETE '/person/${id}' but something went wrong: ${err}\n`
      );
      res
        .status(500)
        .send(
          `Error while trying to delete the information on person #${id}, are you sure you want to take them off Santa's list ?\n`
        );
    } else {
      console.log(
        `Accessed DELETE '/person/${id}' successfully, awww .... one person less on Santa's list ...`
      );
      res
        .status(200)
        .send(`Well ... this person did not behave well apparently ...`);
    }
  });
});

//------------ MODIFY A PERSON --------------//

app.put('/person/:id', (req, res) => {
  let formData = req.body;
  let id = req.params.id;
  id = mysql.escape(id);
  connection.query(
    `UPDATE personne SET ? WHERE id=${id}`,
    [formData],
    (err, results) => {
      if (err) {
        console.log(
          `Tried to access PUT '/person/${id}' but something went wrong: ${err}\n`
        );
        res
          .status(500)
          .send(
            `Error while trying to update the information on person #${id}, are you sure you want to modify their information ?\n`
          );
      } else {
        console.log(
          `Accessed PUT '/person/${id}' successfully, now Santa can correctly deliver the gifts !`
        );
        res.status(200).send(`Yes ! Gifts will be rightfully come soon !`);
      }
    }
  );
});

//------------ CONSULT A PERSON FROM HIS/HER ID --------------//

app.get('/person/:id', (req, res) => {
  let id = req.params.id;
  id = mysql.escape(id);
  connection.query(`SELECT * FROM personne WHERE id=${id}`, (err, results) => {
    if (err) {
      console.log(
        `Tried to access GET '/person/${id}' but something went wrong: ${err}\n`
      );
      res
        .status(500)
        .send(
          `Error while trying to obtain information on person #${id}, are you sure they behaved well ?\n`
        );
    } else {
      console.log(
        `Accessed GET '/person/${id}' successfully, this lucky person actually exists on Santa's list !!`
      );
      res.status(200).json(results);
    }
  });
});

//------------ CREATE A GIFT FOR SOMEONE --------------//

app.post('/person/:id/cadeau', (req, res) => {
  let formData = req.body;
  let id = req.params.id;
  formData['personne_id'] = id;

  connection.query(`INSERT INTO cadeau SET ?`, formData, (err, results) => {
    if (err) {
      console.log(
        `Tried to access POST '/person/${id}/cadeau' but something went wrong: ${err}\n`
      );
      res
        .status(500)
        .send(
          `Error while trying to add a new gift, are you sure they desserve it ?\n`
        );
    } else {
      console.log(
        `Accessed POST '/person/${id}/cadeau' successfully, your favorite person has a new gift`
      );
      res
        .status(200)
        .send(`Your favorite person has now a new gift on Santa's list !!\n`);
    }
  });
});

//------------ CONSULT ALL THE GIFTS OF A PERSON FROM HIS/HER NAME --------------//

app.get('/person/:prenom/cadeaux', (req, res) => {
  let prenom = req.params.prenom;
  prenom = mysql.escape(prenom);
  connection.query(
    `SELECT * FROM cadeau INNER JOIN personne ON cadeau.personne_id = personne.id WHERE personne.prenom = ${prenom}`,
    (err, results) => {
      if (err) {
        console.log(
          `Tried to access GET '/person/${prenom}/cadeaux' but something went wrong: ${err}\n`
        );
        res
          .status(500)
          .send(
            `Error while trying to obtain all the gifts belonging to ${prenom}, are you sure they are on Santa's list ?\n`
          );
      } else {
        console.log(
          `Accessed GET '/person/${prenom}/cadeaux' successfully, these are the gifts for ${prenom}!!`
        );
        res.status(200).json(results);
      }
    }
  );
});

//------------ DELETE SOMEONE'S GIFT --------------//

app.delete('/person/:prenom/:cadeau', (req, res) => {
  let prenom = req.params.prenom;
  prenom = mysql.escape(prenom);
  let cadeau = req.params.cadeau;
  cadeau = mysql.escape(cadeau);

  connection.query(
    `DELETE FROM cadeau WHERE titre =${cadeau} AND cadeau.personne_id = (SELECT id from personne WHERE prenom =${prenom})`,
    (err, results) => {
      if (err) {
        console.log(
          `Tried to access DELETE '/person/${prenom}/${cadeau}' but something went wrong: ${err}\n`
        );
        res
          .status(500)
          .send(
            `Error while trying to delete a gift from ${prenom}, are you sure you want to take away that gift from Santa's list ?\n`
          );
      } else {
        console.log(
          `Accessed DELETE '/person/${prenom}/${cadeau}' successfully, awww .... one gift less for ${prenom} on Santa's list ...`
        );
        res.status(200).send(`Well ... what did this person do to you ?? ...`);
      }
    }
  );
});

//--------------- ERROR MANAGEMENT ---------------//

app.all('/*', (req, res) => {
  console.log(
    `Tried to enter an unexisting route, not so good if you want to get some gifts ...`
  );
  res
    .status(404)
    .send(`Maybe try to go back to an actual part of Santa's Work?`);
});

//--------------- START SERVER ---------------//

app.listen(PORT_NUMBER, err => {
  if (err) {
    console.log(
      `Not such a merry christmas after all ... , there is an error: ${err}\n`
    );
  }
  console.log(
    `Santa Claus is also listening on port: ${PORT_NUMBER}, be a good person ...\n`
  );
});
