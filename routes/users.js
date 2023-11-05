let NeDB = require("nedb");
let { check, validationResult } = require('express-validator');
let db = new NeDB({
  filename: "user.db",
  autoload: true,
});

module.exports = (app) => {
  let route = app.route("/users");


  // busca todod usuarios
  route.get((req, res) => {
    db.find({})
      .sort({ name: 1 })
      .exec((err, users) => {
        if (err) {
          app.utils.error.send(err, req, res);
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            users,
          });
        }
      });
  });
  //salva o usuario

  route.post([check('name',"Nome está vazio!").notEmpty(),
check('email', 'é um problema em seu email').notEmpty().isEmail()], (req, res) => {


  const result = validationResult(req);
  if(result.check){
    return res.send(`O nome está errado, ${req.check.name}!`);
  }


    db.insert(req.body, (err, users) => {
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(users);
      }
    });
 });


//buscar o usuario pelo um id espeficico
   routeId = app.route("/users/:id");

  routeId.get((req,res) =>{

    db.findOne({_id:req.params.id}).exec((err,users) => {

      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(users);
      }
    })
  });
//alterar dados update

  routeId.put((req,res) =>{

    // modulo validator iserie um modulo de assert dentro do req recebe dois parametros
    if (!app.utils.validator.user(app, req, res)) return false;



    db.update({_id:req.params.id}, req.body, err => {

      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(Object.assign(req.params, req.body ));
      }
    })
  });

//excluir
  routeId.delete((req,res) =>{

    db.remove({_id:req.params.id}, {}, err => {

      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(Object.assign(req.params ));
      }
    })
  });




};
