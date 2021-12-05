# TC3041 Proyecto Final

# *Book2Up*
---

##### Integrantes:
1. *Karen Isabel Morgado Castillo* - *A01027446* - *CSF*
2. *Ana Paola Minchaca García* - *A01026744* - *CSF*

---
## 1. Aspectos generales

Las orientaciones del proyecto se encuentran disponibles en la plataforma **Canvas**.

Este documento es una guía sobre qué información debe entregar como parte del proyecto, qué requerimientos técnicos debe cumplir y la estructura que debe seguir para organizar su entrega.

### 1.1 Requerimientos técnicos

A continuación se mencionan los requerimientos técnicos mínimos del proyecto, favor de tenerlos presente para que cumpla con todos.

* El equipo tiene la libertad de elegir las tecnologías de desarrollo a utilizar en el proyecto.
* El proyecto debe utilizar al menos dos modelos de bases de datos diferentes, de los estudiados en el curso.
* La arquitectura debe ser modular, escalable, con redundancia y alta disponibilidad.
* La arquitectura deberá estar separada claramente por capas (*frontend*, *backend*, *API RESTful*, datos y almacenamiento).
* Los diferentes componentes del proyecto (*frontend*, *backend*, *API RESTful*, bases de datos, entre otros) deberán ejecutarse sobre contenedores [Docker](https://www.docker.com/) o desplegarse en un servicio en la nube.
* Todo el código, *datasets* y la documentación del proyecto debe alojarse en este repositorio de GitHub siguiendo la estructura que aparece a continuación.

### 1.2 Estructura del repositorio
El proyecto debe seguir la siguiente estructura de carpetas:
```
- / 			        # Raíz de todo el proyecto
    - README.md			# Archivo con los datos del proyecto (este archivo)
    - frontend			# Carpeta con la solución del frontend (Web app)
    - backend			# Carpeta con la solución del backend
    - schemas			# Carpeta con los modelos para generar las bases de datos
```

### 1.3 Documentación  del proyecto

Como parte de la entrega final del proyecto, se debe incluir la siguiente información:

* Justificación de los modelo de *bases de datos* que seleccionaron.
* Descripción del o los *datasets* y las fuentes de información utilizadas.
* Guía de configuración, instalación y despliegue de la solución.
* Documentación de la API (si aplica). Puede ver un ejemplo en [Swagger](https://swagger.io/). 
* El código debe estar documentado siguiendo los estándares definidos para el lenguaje de programación seleccionado.

## 2. Descripción del proyecto

La aplicación web consiste en una librería llamada *Book2Up* , donde el usuario podrá registrarse e iniciar sesión para después ver el catálogo de libros disponibles y agregarlos a su carrito para proceder a comprarlos. Igualmente existe un usuario administrador, con el cual al iniciar sesión con este permitirá agregar libros al inventario.

## 3. Solución

A continuación aparecen descritos los diferentes elementos que forman parte de la solución del proyecto.

### 3.1 Modelos de *bases de datos* utilizados

*MongoDB*

Para la creación de usuarios, manejo de inventario y manejo de carrito por usuario se usó MongoDB, esto principalmente porque es una de las bases de datos NoSQL más usadas, además de que hay mucha documentación que hace que usarla sea mucho más amigable para cualquier persona que la quiera usar. Al mismo tiempo, MongoDB nos permite tener control de una gran cantidad de datos con consultas optimizadas y eficaces que ayudan a que esto sea escalable en un futuro. 

*Redis*

Para el manejo de sesiones de cada usuario se usó Redis pues junto con express-sessions se guarda el ID del usuario, manteniendo la sesión activa durante media hora, actualizada con un tiempo de expiración, si el tiempo se acaba cerrará la sesión; esto permite que las sesiones sean más seguras.

### 3.2 Arquitectura de la solución

![image](https://imgur.com/XivknPU.jpg)
![image](https://imgur.com/7pHMpi1.jpg)

### 3.3 Frontend

#### 3.3.1 Lenguaje de programación
Para el frontend se usó HTML, junto con sus respectivos estilos de CSS y finalmente aplicados con JavaScript que nos ayudaron a darle forma y hacer nuestra página dinámica.  
#### 3.3.2 Framework
No se utilizó ningún framework para el frontend, todo fue creado desde cero.

#### 3.3.3 Librerías de funciones o dependencias
Como se mencionó antes, no se hizo uso de ningún framework por lo que no fue necesario tener dependencias ni funciones para nuestro frontend. 

### 3.4 API o backend

Como se mencionó antes, la principal base de datos que se usó para este proyecto fue *MongoDB*. Se tuvo que hacer una conexión desde el backend para que fuera posible hacer uso de la base de datos, lo mismo se tuvo que hacer con *Redis* que fue la segunda base de datos que se usó. 

Los modelos que se usaron para *MongoDB* están adjuntos en la carpeta de *schemas*, con esto nos fue posible hacer todas las operaciones CRUD que había que hacer y que finalmente podíamos comprobar haciendo uso de *MongoDB Atlas* donde podíamos ver mucho más fácil nuestras colecciones. 

Así como hicimos uso de *MongoDB Atlas* para ver *Mongo DB*, se hizo uso de *Redis Insight* para ver lo que pasaba con *Redis*, simplemente debíamos hacernos una cuenta y crear una base de datos para tener un host, un puerto y un password único que servía para hacer la conexión.

#### 3.4.1 Lenguaje de programación 
El lenguaje de programación que se usó al 100% para nuestro backend fue JavaScript, que nos permite manejar nuestras operaciones *POST* y *GET* para poder obtener información de nuestras bases de datos y al mismo tiempo desplegarlo en nuestra página web por medio del frontend.  
#### 3.4.2 Framework
Se usó Node.js con el framework express pues es un framework bastante flexible y simple que usa el lenguaje JavaScript, también contiene muchas librerías que te pueden ayudar dependiendo de lo que quieras hacer. 

También se utilizó la API de COPOMEX para hacer consultas del código postal de forma automática cuando el usuario se esté registrando y así sacar el país, estado, municipio y colonia. Para esto se tuvo que crear una sesión en la página y usando el token ya es posible hacer las consultas.

#### 3.4.3 Librerías de funciones o dependencias

```
  "dependencies": {
    "connect-redis": "^5.2.0",
    "express": "^4.17.1",
    "express-session": "^1.17.2",
    "mongodb": "^3.6.8",
    "mongoose": "^5.12.10",
    "nodemon": "^2.0.7",
    "redis": "^3.1.2"
  },
```
#### 3.4.4 Endpoints

app.get('/', ...)
* **Descripción**: Muestra la página de inicio.
* **URL**: http://localhost:3000/
* **Verbos HTTP**: GET

app.get('/signup', ...)
* **Descripción**: Muestra la página de signup.
* **URL**: http://localhost:3000/signup
* **Verbos HTTP**: GET

app.get('/login', ...)
* **Descripción**: Muestra la página de login.
* **URL**: http://localhost:3000/login
* **Verbos HTTP**: GET

app.get('/libros', ...)
* **Descripción**: Muestra el catálogo de libros.
* **URL**: http://localhost:3000/libros
* **Verbos HTTP**: GET

app.get('/a-carrito', ...)
* **Descripción**: Muestra el carrito.
* **URL**: http://localhost:3000/a-carrito
* **Verbos HTTP**: GET

app.get('/agregar', ...)
* **Descripción**: Muestra la página de administrador donde se agregan libros.
* **URL**: http://localhost:3000/agregar
* **Verbos HTTP**: GET

app.get('/bookdata', ...)
* **Descripción**: Se obtienen los libros de la base de datos.
* **URL**: http://localhost:3000/bookdata
* **Verbos HTTP**: GET

app.get('/cartdata', ...)
* **Descripción**: Se obtienen los datos del carrito del usuario que ha iniciado sesión.
* **URL**: http://localhost:3000/cartdata
* **Verbos HTTP**: GET

app.post('/infoLibros', ...)

* **Descripción**: Se manda la información de los libros al hacer click en "Add to Cart" para poder hacer el carrito. Como tal el URL no se ve en la página puesto que solo se manda la información y es redireccionado. 
* **URL**: http://localhost:3000/infoLibros
* **Verbos HTTP**: POST

app.post('/signup', ...)

* **Descripción**: Se manda la información del usuario que se esté registrando para guardarlo en la base de datos. 
* **URL**: http://localhost:3000/signup
* **Verbos HTTP**: POST 
* **Formato JSON del cuerpo de la solicitud**:
```
{
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
}
```
* **Formato de la respuesta**:
La respuesta de este endpoint sería que el usuario se guardará, con un console log de que se ha creado el usuario y te redirecciona a la pagina de login. 

* **Códigos de error**:
Si hubo un error al momento de crear al usuario sale un console log con el error, mientras que si el usuario ya existe te dirá que el usuario ya existe. 

app.post('/validar', ...)

* **Descripción**: Aquí estamos validando al usuario que esté iniciando sesión, haciendo una comparación para ver si se encuentra en la base de datos. 
* **URL**: http://localhost:3000/validar
* **Verbos HTTP**: POST 
* **Formato JSON del cuerpo de la solicitud**: 
```
{
  user,
  contra
}
```
* **Formato de la respuesta**: Si el usuario no existe lo redirecciona a signup, al igual si la contraseña es incorrecta. Si el usuario ingresa exitosamente se redirecciona a libros y si se inicia sesión como administrador se le redirecciona a la página de agregar libros.
* **Códigos de error**: Como tal no es un código de error pero manda un console log si el usuario no existe o si la contraseña es incorrecta, como se mencionó antes. 

app.post('/logout', ...)
* **Descripción**: El usuario cierra sesión y se elimina los datos de la sesión. 
* **URL**: http://localhost:3000/logout
* **Verbos HTTP**: POST 
* **Formato JSON del cuerpo de la solicitud**:
```
{
  req.session
}
```
* **Formato de la respuesta**: Se clearea la cookie del id de sesión del usuario, después se le redirecciona a la página de inicio y sale un mensaje de que la sesión se ha cerrado. 
* **Códigos de error**: Si existe algún error se redirecciona a libros.

app.post('/agregar', ...)
* **Descripción**: Aquí el administrador puede agregar libros a la base de datos, simplemente llena un formulario que después enviará para que quede guardado. 
* **URL**: http://localhost:3000/agregar
* **Verbos HTTP**: POST 
* **Formato JSON del cuerpo de la solicitud**:
```
{
    titulo,
    autor,
    sin,
    precio,
    SKU,
    img
  }
```
* **Formato de la respuesta**: Se redirecciona a agregar si el libro es agregado correctamente, si el libro ya existe redirecciona a agregar y manda mensaje en la consola que ya existe.
* **Códigos de error**: Si existe un error se imprime en la consola.

app.post('/a-carrito', ...)
* **Descripción**: Cada que el usuario agrega un libro a su carrito, se le redirecciona a la página de a-carrito donde podrá ver actualizado su carrito. 
* **URL**: http://localhost:3000/a-carrito
* **Verbos HTTP**: POST 
* **Formato JSON del cuerpo de la solicitud**:
```
req.session.idUsuario
```
* **Formato de la respuesta**: Si el usuario cuenta con un carrito, se le agrega el libro o se aumenta la cantidad de ese libro y manda mensaje de confirmación en la consola. Si el usuario no tenía ningún carrito, simplemente se le crea uno nuevo. 
* **Códigos de error**: Si existe algún error lo imprime en la consola y manda mensaje que algo no salió bien.

app.post('/pagar', ...)
* **Descripción**: Desde la página del carrito el usuario podrá ver un botón de pagar que al hacerle click se le borrará el carrito de la base de datos, se le cerrará la sesión y se le redireccionará a la página de inicio.
* **URL**: http://localhost:3000/pagar
* **Verbos HTTP**: POST 
* **Formato JSON del cuerpo de la solicitud**: 
```
req.session.idUsuario
```
* **Formato de la respuesta**: Se clearea la cookie del id de sesión del usuario y se elimina su carrito, después se le redirecciona a la página de inicio y sale un mensaje diciendo gracias por su compra, mientras que en la consola imprime que la sesión se ha cerrado y el carrito ha sido vaciado. 
* **Códigos de error**:
Si hay algún error a la hora de cerrar la sesión, se le redireccionará nuevamente a la página de pagar, además de que saldrá un error en la consola si es que hubo algún error en el pago. 

## 3.5 Pasos a seguir para utilizar el proyecto
1. Lo primero que se debe hacer es clonar el repositorio
```
git clone https://github.com/tec-csf/tc3041-pf-primavera-2021-team10
```

2. Una vez descargado el proyecto, abrirlo en Visual Studio Code junto con una terminal. Para que fuera posible hacerlo con docker fue necesario hacer un Dockerfile y un docker-compose. Primero se tuvo que hacer un build donde poníamos el tag de la que sería nuestra imagen en el contenedor. 
```
docker build --tag book2up .
```
3. Una vez hecho esto, simplemente debíamos hacer un build de nuestro docker-compose donde viene específicado que imagen es la que queremos, en que puertos, que dockerfile es el que usa, además del commando para correrlo y que pudieramos montar el contenedor. 
```
docker-compose build
```
4. Ya con todo lo anterior hecho, el último paso es correr el contenedor. 
```
docker-compose up
```
Si no hubo ningún error, en cualquier navegador web al entrar a localhost:3000, la página debería desplegarse y funcionar correctamente. Si se quiere eliminar el contenedor recién usado entonces deberá correr la siguiente línea de código. 
```
docker-compose down
```

## 4. Referencias

1. [Hacer conexión con mongoose](https://mongoosejs.com/docs/guide.html)  
2. [Crear una página dinámica con JS](https://medium.com/@pearlmcphee/build-a-dynamic-app-using-javascript-html-and-css-f0dfc136007a)  
3. [Crear sesiones usando Express](https://www.youtube.com/watch?v=OH6Z0dJ_Huk&ab_channel=CodeRealm)  
4. [Uso de Fetch request](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) 
5. [Conexion y manejo de sesiones con Redis usando Express-sessions](https://medium.com/mtholla/managing-node-js-express-sessions-with-redis-94cd099d6f2f)
6. [Operaciones CRUD usando mongoose](https://www.digitalocean.com/community/tutorials/nodejs-crud-operations-mongoose-mongodb-atlas)
7. [Armar una REST API usando Express y mongoose](https://rahmanfadhil.com/express-rest-api/)
8. [API para código postal](https://copomex.com/)
9. [Ejemplos de uso CSS](https://www.w3schools.com/)
