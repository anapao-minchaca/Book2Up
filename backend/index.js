const express = require("express");
const usuarios = require("../schemas/usermodel");
const books = require("../schemas/bookmodel");
const cart = require ("../schemas/cartmodel");
const path = require("path");
const app = express.Router();

//variables de sesiones
const login = (req, res, next) => {
  if(!req.session.idUsuario){
    res.redirect('/login.html')
  }else{
    next();
  }
}

const libros = (req, res, next) => {
  if(!req.session.idUsuario){
    res.redirect('/book2up.html')
  }else{
    next();
  }
}

const admin = (req, res, next) => {
  if(req.session.idUsuario != "admin") {
    res.redirect('/book2up.html')
  } else {
    next();
  }
}

//rutas
app.get('/', function (req, res){
    const {idUsuario} = req.session;
    res.sendFile(path.join(__dirname, "..", "/frontend/book2up.html"));
})

app.get('/signup', function (req, res) {
    res.sendFile(path.join(__dirname, "..", "/frontend/signup.html"));
})

app.get('/login', login, function (req, res) {
  res.sendFile(path.join(__dirname, "..", "/frontend/login.html"));
})

app.get('/libros', libros, function (req, res) {
  res.sendFile(path.join(__dirname, "..", "/frontend/libros.html"));
})

app.get('/a-carrito', libros, function (req, res) {
  res.sendFile(path.join(__dirname, "..", "/frontend/carrito.html"));
})

app.get('/agregar', admin, function (req, res) {
  res.sendFile(path.join(__dirname, "..", "/frontend/agregar.html"));
})

// desplegar libros en la pagina
app.get('/bookdata', libros, async (req, res) => {
  const info = await books.find({});
  res.send(info);
})

// desplegar carrito en la pagina
app.get('/cartdata', libros, async (req, res) => {
  const currentuser = req.session.idUsuario;
  const infocart = await cart.findOne({username: currentuser});
  res.send(infocart.libros);
})


// obtener info de libros
app.post('/infoLibros', (req,res) => {
codigo = req.body.SKU;
nombre = req.body.titulo;
money = req.body.precio;
res.redirect('/a-carrito');
})

//registro
app.post("/signup", async (req, res) => {
    const{
      nombre,
      apellidos,
      mail,
      user,
      contra,
      codigo_postal,
      pais,
      estado,
      municipio,
      colonia,
      tarjeta,
      expiryMonth,
      expiryYear,
      cvv
    } = req.body;
    
  let usuario = await usuarios.findOne({user});
  if(!usuario){
    usuario = new usuarios({
      nombre,
      apellidos,
      mail,
      user,
      contra,
      codigo_postal,
      pais,
      estado,
      municipio,
      colonia,
      tarjeta,
      expiryMonth,
      expiryYear,
      cvv
    });
    try {
      await usuario.save();
      res.redirect('/login');
      console.log("Usuario creado");
    
    } catch (error) {
      console.log(error);
    }
    
  }else{
    res.redirect('/signup');
    console.log("Usuario existente");
  }
  });

//iniciar sesion
app.post('/validar', async (req,res) => {
  const{user, 
    contra} = req.body;
  const usuario = await usuarios.findOne({user});
  const password = await usuarios.findOne({contra});
  const admin = await usuarios.findOne({'user': 'admin'});

  if(!usuario){
    res.redirect('/signup');
    console.log("Usuario inexistente");
  }else{
    if(!password){
      res.redirect('/login');
      console.log("Password incorrecto");
    }
    else{
      if(usuario.user == admin.user){
        req.session.idUsuario = usuario.user;
        console.log(req.session.idUsuario);
        res.redirect('/agregar');
        console.log("Bienvenido admin");
      }else{
        req.session.idUsuario = usuario.user;
        console.log(req.session.idUsuario);
        res.redirect('/libros');
        console.log("Bienvenido");
      }
    }
  }
})


//cerrar sesion
app.post('/logout', login, async(req, res) =>{
  req.session.destroy(err => {
    if(err){
      return res.redirect('/libros');
    }
    res.clearCookie('sid');
    res.redirect('/');
    console.log("La sesion se ha cerrado");
  })
})

//agregar libros
app.post("/agregar", async (req, res) => {
  const{
    titulo,
    autor,
    sin,
    precio,
    SKU,
    img
  } = req.body;
  
let book = await books.findOne({SKU});
if(!book){
  book = new books({
    titulo,
    autor,
    sin,
    precio,
    SKU,
    img
  });
  try {
    await book.save();
    res.redirect('/agregar');
    console.log("Libro agregado");
  
  } catch (error) {
    console.log(error);
  }
  
}else{
  res.redirect('/agregar');
  console.log("Libro ya existente");
}
});

//agregar carrito
app.post('/a-carrito', async(req, res) =>{

  const currentuser = req.session.idUsuario;
  let usercart = await cart.findOne({username: currentuser});

  if(!usercart){
    usercart = new cart({
      username: currentuser,
      libros: [
      {
        SKU: codigo, 
        titulo: nombre,
        cantidad: 1,
        total: money     
      }
    ]
    });
    await usercart.save();
  } else {
    let kart = usercart.libros;
    let idLibro = await Object.values(kart);
    let idLibro2 = await idLibro.find(element => element.SKU === codigo);

    if(idLibro2 === undefined){
      kart.push({ SKU: codigo ,titulo: nombre, cantidad: 1,total: money });
      cart.updateOne({username: currentuser}, {$set:{libros:kart}}, function(err, res) {
      if (err) throw err;
      console.log("Se actualizo el carrito");
    });
    }else{
      var i;
      var updatedKart=[]
      for(i=0;i<kart.length;i++)
      {
        if(kart[i].titulo===idLibro2.titulo)
        {
          idLibro2.cantidad= idLibro2.cantidad+1;
          idLibro2.total=idLibro2.cantidad*money;
          updatedKart.push(idLibro2);
        }
        else
        {
          updatedKart.push(kart[i]);
        }
      }
      cart.updateOne({username: currentuser}, {$set:{libros:updatedKart}}, function(err, res) {
        if (err) throw err;
        console.log("Se actualizo el carrito");
      });
    }
  }
  try {
    res.redirect('/libros');
    console.log("Libro agregado al carrito");
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Algo salio mal");
  }
  
 
  });

  // pagar (vaciar carrito)
  app.post('/pagar', libros, async(req, res) =>{
      const currentuser = req.session.idUsuario;
      let usercart = await cart.deleteOne({username: currentuser});
      try {
        req.session.destroy(err => {
          if(err){
            return res.redirect('/pagar');
          }
          res.clearCookie('sid');
          res.redirect('/');
          console.log("La sesion se ha cerrado y carrito vaciado");
        })
      } catch (error) {
        console.log(error);
      }
  })

module.exports = app;
