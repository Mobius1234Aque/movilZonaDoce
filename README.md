# Proyecto de Aplicación Móvil

## Descripción del Proyecto

Este proyecto consiste en una aplicación móvil desarrollada con **React Native** y conectada a un backend previamente implementado en **Express**. Su principal objetivo es facilitar el acceso a los recursos y funcionalidades clave de manera intuitiva y eficiente, mejorando la experiencia del usuario final. La aplicación está diseñada para ser una herramienta que simplifique la interacción de los usuarios con la plataforma, permitiendo realizar tareas específicas de forma rápida y accesible, independientemente del nivel técnico del usuario. Además, busca optimizar la usabilidad y el rendimiento para que los usuarios puedan acceder a la información y servicios en tiempo real, minimizando fricciones y maximizando la productividad.

## Metodología de Desarrollo

### 1. Metodología utilizada

La metodología elegida para este proyecto es **Extreme Programming (XP)**, que se caracteriza por ciclos de retroalimentación rápidos, trabajo en equipo colaborativo y énfasis en la calidad del código. XP asegura que el producto pueda ajustarse a los cambios a medida que se desarrollan nuevas funcionalidades, manteniendo la calidad técnica alta.

### 2. ¿Cómo se aplicó esta metodología?

El proyecto se ha dividido en **sprints** de corta duración (1-3 semanas). Cada sprint tiene objetivos claros y se revisa el progreso del proyecto tres veces por mes. La planeación y retroalimentación constante con el equipo es fundamental para ajustarse a los cambios.

### 3. Planificación y fases del proyecto

El proyecto está dividido en las siguientes fases:

- **Sprint 1**: Definición de Módulos
  - **Issue/Tarea**: Definir módulos esenciales
    - **Responsable**: Jesus Antonio Ramirez Hernandez y Reyna de los Angeles Vite Vera
    - **Fechas**: Inicio - 9 de Septiembre, Fin - 12 de Septiembre
    - **Descripción**: Identificar y documentar los módulos necesarios para la aplicación, estableciendo un esquema claro de funcionalidades.
- **Sprint 2**: Diseño de Pantallas
  - **Issue/Tarea**: Crear el diseño de las pantallas
    - **Responsable**: Jesus Antonio Ramirez Hernandez y Reyna de los Angeles Vite Vera
    - **Fechas**: Inicio - 15 de Septiembre, Fin - 17 de Septiembre
    - **Descripción**: Diseñar las pantallas de la aplicación asegurando una buena experiencia de usuario y accesibilidad.
- **Sprint 3**: Desarrollo de Interfaces de Usuario (UI)
  - **Issue/Tarea**: Implementar la UI
    - **Responsable**: Jesus Antonio Ramirez Hernandez
    - **Fechas**: Inicio - 18 de Septiembre, Fin - 10 de Octubre
    - **Descripción**: Desarrollar las interfaces de usuario basadas en los diseños aprobados en el sprint anterior.
- **Sprint 4**: Integración con Backend

  - **Issue/Tarea**: Integrar la aplicación con el backend
    - **Responsable**: Reyna de los Angeles Vite Vera
    - **Fechas**: Inicio - 11 de Octubre , Fin - 25 de Octubre
    - **Descripción**: Conectar las interfaces de usuario con el backend para asegurar que los datos se manejen correctamente.

- **Sprint 5**: Pruebas y Optimización

  - **Issue/Tarea**: Realizar pruebas funcionales
    - **Responsable**: Jesus Antonio Ramirez Hernandez y Reyna de los Angeles Vite Vera
    - **Fechas**: Inicio - 30 de Octubre, Fin - 15 de Noviembre
    - **Descripción**: Ejecutar pruebas para identificar y corregir errores, así como optimizar el rendimiento de la aplicación.

- **Sprint 6**: Despliegue

  - **Issue/Tarea**: Preparar la aplicación para el despliegue
    - **Responsable**: Jesus Antonio Ramirez Hernandez y Reyna de los Angeles Vite Vera
    - **Fechas**: Inicio - 15 de Noviembre, Fin - 25 de Noviembre
    - **Descripción**: Configurar la aplicación para su despliegue en un entorno de producción.

- **Sprint 7**: Retroalimentación y Mejoras
  - **Issue/Tarea**: Recoger feedback y realizar mejoras
    - **Responsable**: Jesus Antonio Ramirez Hernandez y Reyna de los Angeles Vite Vera
    - **Fechas**: Inicio - 25 de Noviembre, Fin - 25 de Diciembre
    - **Descripción**: Analizar la retroalimentación de los usuarios y realizar ajustes necesarios para mejorar la aplicación.

## Gestión de Tareas e Issues

### 1. Herramienta seleccionada

Utilizamos **Trello** para la gestión de tareas e issues. Las tarjetas se organizan por listas que representan el estado de la tarea: Pendiente, En progreso, y Finalizada.

### 2. Proceso de gestión de tareas en Trello

Cada tarjeta en **Trello** sigue un flujo definido:

1. **Creación de tarjeta**: Se crea una tarjeta en la lista de tareas pendientes.
2. **Asignación de tarea**: Cada tarea es asignada a un miembro del equipo.
3. **Trabajo en la tarea**: Cuando la tarea está en progreso, la tarjeta se mueve a la lista correspondiente.
4. **Revisión**: Una vez finalizada, se revisa la tarea por un miembro del equipo.
5. **Cierre de tarea**: La tarjeta se mueve a la lista de tareas completadas.

### 3. Priorización de tareas

Las tarjetas en Trello están etiquetadas por prioridad:

- **Alta**: Tareas críticas que deben completarse primero.
- **Media**: Tareas importantes, pero no urgentes.
- **Baja**: Mejoras o pequeños ajustes.

## Control de Versiones

### 1. Herramienta seleccionada

Utilizamos **Git** para el control de versiones, con **GitHub** como la plataforma para la colaboración en equipo. El uso de ramas permite que el desarrollo avance de manera organizada y controlada.

### 2. Estrategia de versionamiento

Hemos adoptado la estrategia **GitFlow** para el control de versiones, que incluye las siguientes ramas:

- `master`: Contiene el código de producción estable.
- `develop`: Es la rama donde se integran todas las nuevas funcionalidades antes de pasar a producción.
- `feature/`: Ramas creadas para desarrollar características específicas.
- `hotfix/`: Ramas para corregir errores críticos en producción.

## Estrategia de Despliegue

### 1. Estrategia seleccionada

Usamos una estrategia de **Canary Deployment**, que permite desplegar nuevas versiones de la aplicación de manera gradual. Esto asegura que las nuevas características no afecten negativamente a todos los usuarios en caso de que haya un problema.

### 2. Definición de entornos

El proyecto se despliega en los siguientes entornos:

- **Desarrollo**: Se prueba el código de las ramas `feature/`.
- **Staging**: Se revisa la integración de las ramas `develop`.
- **Producción**: Contiene el código estable de la rama `master`.

### 3. Integración continua

Utilizamos **GitHub Actions** para la integración continua, lo que permite automatizar las pruebas y el despliegue en cada commit a `develop` o `master`.

## Instrucciones para Ejecutar el Proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Mobius1234Aque/movilZonaDoce.git
cd movilZonaDoce
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar proyecto

```bash
npx expo start
```
