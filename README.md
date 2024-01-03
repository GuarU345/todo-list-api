# Backend Para Manejo de Tareas

Esta es una api construida en nodejs y express que proporciona las funciones
para el manejo de las tareas ya sea crearlas, eliminarlas e incluso
filtrarlas, cuenta con 2 endpoints uno para registrarte y otro para realizar
el inicio de sesion y obtener un token de acceso

## Tabla de contenidos

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Uso](#uso)
4. [Rutas](#rutas)
5. [Contribuciones](#contribuciones)
6. [Contacto](#contacto)

## Requisitos

- Node.js (v18 o superior)
- npm (normalmente se instala con Node.js)

## Instalación

```bash
git clone https://github.com/GuarU345/todo-list-api-express.git
```

```bash
cd nombre-del-proyecto
```

```bash
npm install
```

```bash
npm run dev
```

## Uso

Esta API te permite acceder a las funciones para registrar usuarios y poder iniciar sesion
tambien permite crear y eliminar las tareas por usuario

## Ejemplo de solicitud GET a la ruta /api/todos

curl http://localhost:3000/api/ejemplo

## Rutas

### Obtener todas las tareas

- **Ruta:** `GET api/todos`
- **Descripcion:** Obtiene la lista de tareas de un usuario en especifico
- **Parametros de consulta:** Ninguno.
- **Ejemplo de respuesta:**

```json
[
  {
    "title": "tarea1",
    "completed": false,
    "user":{
      "username":"test1"
    }
  }
]
```

## Contribuciones

- Crea un fork del repositorio
- Crea una nueva rama para tus cambios: `git checkout -b nueva-caracteristica`
- Realiza tus cambios y haz commit: `git commit -m "añade nueva caracteristica`
- Envia tus cambios: `git push origin tu-rama`

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto conmigo
en [abelmtz34@outlook.com] o con mi perfil de github GuarU345.

¡Gracias por utilizar la API!

