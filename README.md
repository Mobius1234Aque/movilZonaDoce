# Proyecto de Aplicación Móvil

## Descripción del Proyecto
Este proyecto consiste en una aplicación móvil desarrollada con React Native y conectada a un backend previamente implementado en Express. Su principal objetivo es facilitar el acceso a los recursos y funcionalidades clave de manera intuitiva y eficiente, mejorando la experiencia del usuario final. La aplicación está diseñada para ser una herramienta que simplifique la interacción de los usuarios con la plataforma, permitiendo realizar tareas específicas de forma rápida y accesible, independientemente del nivel técnico del usuario. Además, busca optimizar la usabilidad y el rendimiento para que los usuarios puedan acceder a la información y servicios en tiempo real, minimizando fricciones y maximizando la productividad.

El desarrollo del proyecto sigue una metodología ágil basada en los principios de **Extreme Programming (XP)**, enfocándose en ciclos rápidos de entrega, colaboración continua con los usuarios y flexibilidad para adaptarse a los cambios en los requisitos a medida que surgen nuevas necesidades.

---

## Metodología de Desarrollo

### 1. Metodología utilizada
La metodología elegida para este proyecto es **Extreme Programming (XP)**, que se caracteriza por ciclos de retroalimentación rápidos, trabajo en equipo colaborativo y énfasis en la calidad del código. XP asegura que el producto pueda ajustarse a los cambios a medida que se desarrollan nuevas funcionalidades, manteniendo la calidad técnica alta.

### 2. ¿Cómo se aplicó esta metodología?
Se ha dividido el proyecto en **sprints** de corta duración (1-3 semanas). Cada sprint tiene objetivos claros y se revisa el progreso del proyecto tres veces por mes. La planeación y retroalimentación constante con el equipo es fundamental para ajustarse a los cambios.

### 3. Planificación y fases del proyecto
El proyecto está dividido en las siguientes fases:

1. **Sprint 1: Definición de Módulos**  

2. **Sprint 2: Diseño de Pantallas**  

3. **Sprint 3: Desarrollo de Interfaces de Usuario (UI)**  

4. **Sprint 4: Integración con Backend**  

5. **Sprint 5: Pruebas y Optimización**  

6. **Sprint 6: Despliegue**  

7. **Sprint 7: Retroalimentación y Mejoras**  


---

## Gestión de Tareas e Issues

### 1. Herramienta seleccionada
Utilizamos **Trello** para la gestión de tareas e issues. Las tarjetas se organizan por listas que representan el estado de la tarea (Pendiente, En progreso, Finalizada).

### 2. Proceso de gestión de tareas en Trello
Cada tarjeta en Trello sigue un flujo definido:

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

---

## Control de Versiones

### 1. Herramienta seleccionada
Utilizamos **Git** para el control de versiones, con **GitHub** como la plataforma para la colaboración en equipo. El uso de ramas permite que el desarrollo avance de manera organizada y controlada.

### 2. Estrategia de versionamiento
Hemos adoptado la estrategia **GitFlow** para el control de versiones, que incluye las siguientes ramas:

- **master**: Contiene el código de producción estable.
- **develop**: Es la rama donde se integran todas las nuevas funcionalidades antes de pasar a producción.
- **feature/**: Ramas creadas para desarrollar características específicas.
- **hotfix/**: Ramas para corregir errores críticos en producción.

### 3. Flujo de creacion de ramas
1. **Creación de ramas**:
   - Para cada nueva funcionalidad, se crea una rama desde `develop` con el prefijo `feature/` (e.g., `feature/nueva-funcionalidad`). Cada miembro del equipo trabaja en su rama hasta que la funcionalidad está completa.
   - Para preparaciones de lanzamientos, se crean ramas `release/` desde `develop`.
   - Las correcciones urgentes se realizan en ramas `hotfix/` creadas desde `master`.

2. **Revisión de código**:
   - Una vez completada la funcionalidad en la rama `feature/`, se crea un **pull request** hacia la rama `develop`. Este proceso incluye una revisión exhaustiva del código por otros miembros del equipo para garantizar que cumple con los estándares de calidad, y que no introduce errores o conflictos.
   - Las ramas `release/` y `hotfix/` también requieren pull requests hacia `develop` y `master`.

3. **Fusión**:
   - Después de pasar la revisión y las pruebas, las ramas `feature/` se fusionan en `develop` y las ramas `hotfix/` se fusionan tanto en `develop` como en `master`.
   - Las ramas de preparación de lanzamiento (`release/`) son fusionadas en `master` una vez que se aprueban y se lanzan a producción.

Este flujo asegura que cada nueva funcionalidad o corrección pase por un proceso de revisión y pruebas antes de ser integrada en las ramas principales, lo que mejora la calidad y estabilidad del código.

### 4. Integracion CI
- **Pruebas unitarias** para asegurar que cada componente del sistema funcione correctamente.
- **Pruebas de integración** para validar que los módulos interactúan adecuadamente entre sí.
- **Linting y análisis de estilo** para asegurar que el código cumpla con las guías de estilo definidas y sea mantenible.

La integración continua también ayuda a detectar errores de manera temprana y evitar que código defectuoso llegue a producción, mejorando así la eficiencia del equipo y la estabilidad del proyecto.

---

## Estrategia de Despliegue

### 1. Estrategia seleccionada
Usamos una estrategia de **Canary Deployment**, que permite desplegar nuevas versiones de la aplicación de manera gradual. Esto asegura que las nuevas características no afecten negativamente a todos los usuarios en caso de que haya un problema.

### 2. Definición de entornos
El proyecto se despliega en los siguientes entornos:
- **Desarrollo**: Se prueba el código de las ramas **feature/**.
- **Staging**: Se revisa la integración de las ramas **develop**.
- **Producción**: Contiene el código estable de la rama **master**.

### 3. Integración continua
Utilizamos **GitHub Actions** para la integración continua, lo que permite automatizar las pruebas y el despliegue en cada commit a **develop** o **master**.

---

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
