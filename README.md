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
- [Operaciones Mentales](#operaciones-mentales)
  - [Descripción](#descripción)
     - [Tecnologías](#tecnologías)
  - [Dominio](#dominio)
     - [Configuración](#configuración)
     - [Operación Completa](#operación-completa)
     - [Números Secuenciales](#números-secuenciales)
     - [Calcular Vuelto](#calcular-vuelto)
  - [Funciones](#funciones)
     - [Sitio de la Aplicación](#sitio-de-la-aplicación)
  - [Autor](#autor)
     - [Contacto](#contacto)
  - [Licencia de Uso](#licencia-de-uso)

## Descripción
Sistema para ejercitar la resolucion de operaciones de suma/resta mentalmente. Desarrollado en Python utilizando el framework Django (master) y solo JavaScript/JQuery (deployed).
Funciones Principales:
- Panel del Configuración para personalizar la forma de presentación de las operaciones (suma/resta/combinadas).
- Calcular el vuelto correspondiente.
- Valoración de cada respuesta ingresada del usuario.
- Visualización de los resultados obtenidos (Gráfico de Barras/Gráfico de Sectores-Pastel).
   
### Tecnologías

- Interacción con la Interfaz: [Java](https://www.java.com/es/) y [JQuery](https://jquery.com/) - Agregar comportamiento a los componentes de la UI.
- Lenguaje del lado del Servidor: [Python](https://www.python.org/) - Crear las operaciones.
- Web Framework: [Django](https://www.djangoproject.com/) - Facilitar el desarrollo web.
- Almacenamiento: [LocalStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage) - Almacenar la respuesta del servidor y los resultados del usuario.
- Visualización de Información: [D3js](https://d3js.org/) - Crear gráficos informativos (Gráfico de barras/sectores).
  
## Dominio

Cualquier usuario que entre en la pagina puede configurar la generación de operaciones matemáticas(suma/resta) para luego resolverlas mentalmente. Adicionalmente existe la opción de cobrar vuelto. Las 3 funciones principales:
- Operación Completas: se presentan todos los números en pantalla.
- Números Secuenciales: los números van apareciendo y desapareciendo uno tras de otro.
- Calcular Vuelto: el sistema presenta la cantidad a cobrar y la cantidad que pago el cliente, el usuario debe calcular la cantidad a devolver(vuelto).

### Configuración

| # | Campo             | Opciones                                                         |
|---|-------------------|------------------------------------------------------------------|
| 1 | Tipo de Operación | 1) Suma 2) Resta 3) Aleatorio  (mezclar sumas y restas)          |
| 2 | Modo              | 1) Operación Completa 2) Números Secuenciales 3) Calcular Vuelto |
| 3 | # Rondas          | Integer (1 - 20)                                                 |
| 4 | # Números         | Integer (1 - 20)                                                 |
| 5 | # Dígitos         | 1) Integer (1 - 20) 2) Aleatorio (rango  entre 1 y lo ingresado) |

### Operación Completa

| Campo     | Opciones       |
|-----------|----------------|
| Respuesta | Entero/Decimal |

### Números Secuenciales

| Campo     | Opciones       |
|-----------|----------------|
| Respuesta | Entero/Decimal |

### Calcular Vuelto

| Campo     | Opciones       |
|-----------|----------------|
| Respuesta | Entero/Decimal |

## Funciones
<table>
  <tr>
    <td witdh="100%">
      <h3 align="center">Panel de Configuración</h3>
      <div align="center">
        <img src="https://raw.githubusercontent.com/bnphony/Suma-Mental/deployed/static/img/Configuration_Panel.PNG" width="80%" alt="Configuration Panel">
        <p>
          - Opciones de Configuración: Tipo de Operación, Modo de Juego, Número de Rondas, Cantidad de Números, Cantidad de Dígitos.
        </p>
      </div>
    </td>
    
  </tr>
  
  <tr>
    <td witdh="100%">
      <h3 align="center">Operación Completa</h3>
      <div align="center">
        <img src="https://raw.githubusercontent.com/bnphony/Suma-Mental/deployed/static/img/Operacion_Completa.PNG" width="80%" alt="Splash Screen">
        <p>
          - Todos los números se presenta en pantalla.
        </p>
      </div>
    </td>
  </tr>

  
  <tr>
    <td witdh="100%">
      <h3 align="center">Números Secuenciales</h3>
      <div align="center">
        <img src="https://raw.githubusercontent.com/bnphony/Suma-Mental/deployed/static/img/Secuencial.PNG" width="80%" alt="Splash Screen">
        <p>
          - Los números son presentados uno por uno secuencialmente.
        </p>
      </div>
    </td>
  </tr>

  <tr>
    <td witdh="100%">
      <h3 align="center">Calcular Vuelto</h3>
      <div align="center">
        <img src="https://raw.githubusercontent.com/bnphony/Suma-Mental/deployed/static/img/Vuelto.PNG" width="80%" alt="Splash Screen">
        <p>
          - El sistema presenta la cantidad a cobrar, el pago del cliente (dólares y centavos). El usuario debe calcular el pago del cliente y la cantidad a devolver.
        </p>
      </div>
    </td>
    
  </tr>
  <tr>
    <td witdh="100%">
      <h3 align="center">Ejercicios Resueltos</h3>
      <div align="center">
        <img src="https://raw.githubusercontent.com/bnphony/Suma-Mental/deployed/static/img/Resultados_1.PNG" width="80%" alt="Splash Screen">
        <p>
          - Resultados: Ejercicios resultados por el usuario, la respuesta enviada y su valoración.
        </p>
      </div>
    </td>
    
  </tr>

  <tr>
    <td witdh="100%">
      <h3 align="center">Gráfico de los Resultados</h3>
      <div align="center">
        <img src="https://raw.githubusercontent.com/bnphony/Suma-Mental/deployed/static/img/Resultados_2.PNG" width="80%" alt="Splash Screen">
        <p>
          - Gráfico de Barras: Número de respuestas correctas, incorrectas y sin respuesta.<br/>
          - Gráfico de Sectores (Pastel): Porcentaje de respuestas correctas, incorrectas y sin respuesta.
        </p>
      </div>
    </td>
    
  </tr>
</table>

### Sitio de la Aplicación

[Link de la aplicación](https://bnphony.github.io/Suma-Mental/)



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
