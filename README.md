<div align="center">
  
  # Operaciones Mentales
</div>

<div align="center">
  
  ![GitHub](https://img.shields.io/github/last-commit/bnphony/Suma-Mental)
  [![JavaScript](https://img.shields.io/badge/Code-JavaSript-orange)](https://developer.mozilla.org/es/docs/Web/JavaScript)
  [![HTML](https://img.shields.io/badge/HyperText-HTML-761fd8)](https://developer.mozilla.org/es/docs/Web/HTML)
  [![CSS](https://img.shields.io/badge/Style-CSS-blue)](https://developer.mozilla.org/es/docs/Web/CSS)
  [![D3js](https://img.shields.io/badge/Code-D3js-cc6d0e)](https://d3js.org/)
  [![Python](https://img.shields.io/badge/Code-Python-fd81f)](https://www.python.org/)
  [![Django](https://img.shields.io/badge/Framework-Django-green)](https://www.djangoproject.com/)
</div>

## Indice
- [App Móvil para la Gestión de Ventas](#app-móvil-para-la-gestión-de-ventas)
  - [Descripción](#descripción)
    - [Tecnologías](#tecnologías)
  - [Dominio](#dominio)
    - [Cliente](#cliente)
    - [Producto](#producto)
    - [Venta](#venta)
    - [Productos Vendidos](#productos-vendidos)
    - [Usuario](#usuario)
  - [Funciones](#funciones)
    - [Probar la Aplicación](#probar-la-aplicación)
  - [Autor](#autor)
    - [Contacto](#contacto)
  - [Licencia de Uso](#licencia-de-uso)

## Descripción
Sistema para ejercitar la resolucion de operaciones de suma/resta mentalmente. Desarrollado en Python utilizando el framework Django (master) y solo JavaScript/JQuery (deployed).
Funciones Principales:
- Panel del Configuración para personalizar la forma de presentación de las operaciones (suma/resta/combinadas).
- Calcular el vuelto correspondiente.
- Valoración de cada respuesta ingresada del usuario.
- Visualización de los resultados obtenidos (Grafico de Barras/Gráfico de Sectores-Pastel).
   
### Tecnologías

- Lenguaje de Programación: [Java](https://www.java.com/es/) - Lenguaje predeterminado de Android Studio.
- Base de Datos: [SQLite3](https://developer.android.com/tools/sqlite3?hl=es-419) - Administrar la base de datos de la aplicación.
- Material Design: EditText - Android.material:1.0.0, ImageView - CircleImageView:3.1.0
  
## Dominio

Cualquier usuario que entre en la pagina puede configurar la generación de operaciones matematicas(suma/resta) para luego resolverlas mentalmente. Adicionalmente existe la opción de cobrar vuelto. Las 3 funciones principales:
- Operación Completas: se presentan todos los numeros en pantalla.
- Numeros Secuenciales: los numeros van apareciendo y desapariendo uno tras de otro.
- Calcular Vuelto: el sistema presenta la cantidad a cobrar y la cantidad que pago el cliente, el usuario debe calcular la cantidad a devolver(vuelto).



## Funciones
<table>
  <tr>
    <td witdh="50%">
      <h3 align="center">Splash Screen</h3>
      <div align="center">
        <img src="./img_ventas/splash_screen.png" width="200" alt="Splash Screen">
        <p>
          - Primera pantalla de la aplicación, animación de cierre entre el icono de la aplicación y el nombre de la misma.
        </p>
      </div>
    </td>
    <td witdh="50%">
      <h3 align="center">Inicio de Sesión</h3>
      <div align="center">
        <img src="./img_ventas/login.png" width="200" alt="Splash Screen">
        <p>
          - Pantalla de Inicio de Sesión, solo pueden ingresar usuarios que esten registrados en la base de datos.<br/>
          - Opción de mantener activa la sesión, incluso si se cierra la aplicación.
        </p>
      </div>
    </td>
  </tr>
  
  <tr>
    <td witdh="50%">
      <h3 align="center">Crear un Usuario</h3>
      <div align="center">
        <img src="./img_ventas/crear_usuario.png" width="200" alt="Splash Screen">
        <p>
          - Crear una cuenta de usuario para acceder a la aplicación. Campo de confirmación de contraseña.
        </p>
      </div>
    </td>
    <td witdh="50%">
      <h3 align="center">Menú Principal</h3>
      <div align="center">
        <img src="./img_ventas/main_menu.png" width="200" alt="Splash Screen">
        <p>
          - Saludo de bienvenida al usuario. Opciones: Gestión de Clientes, Gestión de Productos, Gestión de Ventas y Opción para Cerrar Sesión. 
        </p>
      </div>
    </td>
  </tr>

  
  <tr>
    <td witdh="50%">
      <h3 align="center">Gestión de Clientes</h3>
      <div align="center">
        <img src="./img_ventas/create_client.png" width="200" alt="Splash Screen">
        <p>
          - CREATE, LIST, UPDATE, DELETE clientes.
        </p>
      </div>
    </td>
    <td witdh="50%">
      <h3 align="center">Gestión de Productos</h3>
      <div align="center">
        <img src="./img_ventas/create_product.png" width="200" alt="Splash Screen">
        <p>
          - CREATE, LIST, UPDATE, DELETE productos. </br>
        - La fecha de caducidad no puede ser menor que la fecha actual. 
        </p>
      </div>
    </td>
  </tr>

  <tr>
    <td witdh="100%" colspan="2">
      <h3 align="center">Gestión Ventas</h3>
      <div align="center">
        <img src="./img_ventas/create_sale.png" width="200" alt="Splash Screen">
        <p>
          - CREATE, LIST Ventas
          - Uso de Dialog para seleccionar el producto y la cantidad a vender.<br/>
          - Seleccionar el cliente de la venta.
        </p>
      </div>
    </td>
    
  </tr>
</table>

### Probar la Aplicación

[Descargar la aplicación](https://github.com/bnphony/Ventas-AS/tree/master/img_ventas/app.apk)



## Autor
Codificado por [Bryan Jhoel Tarco Taipe](https://github.com/bnphony)

### Contacto
<a href="https://www.linkedin.com/in/bryan-tarco01" rel="noopener noreferrer" target="_blank">
  <img align="center" src="https://github.com/bnphony/Portafolio/blob/deployed/static/img/linkedin_icon.png" alt="LinkedIn" height="40" width="40" />
</a>
<a href="https://github.com/bnphony" rel="noopener noreferrer" target="blank">
  <img align="center" src="https://github.com/bnphony/Portafolio/blob/deployed/static/img/github_icon.png" alt="GitHub" height="40" width="40" />
</a>
<a href="mailto: bryan.tarco01@gmail.com" target="_blank">
  <img align="center" src="https://github.com/bnphony/Portafolio/blob/deployed/static/img/email_icon.png" alt="Email" height="40" width="40" />
</a>



## Licencia de Uso
Este repositorio y todo su contenido está licenciado bajo licencia **Creative Commons**. Por favor si compartes, usas o modificas este proyecto cita a su
autor, y usa las mismas condiciones para su uso docente, formativo o educativo y no comercial.
