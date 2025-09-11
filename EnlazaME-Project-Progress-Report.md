
# Informe de Progreso del Proyecto: EnlazaME

---

## Hoja de Presentación

**Título del Proyecto:** EnlazaME

**Descripción:**
EnlazaME es una plataforma de bolsa de trabajo diseñada para conectar a estudiantes y egresados de la Facultad de Ingeniería de Tampico con oportunidades laborales relevantes ofrecidas por empresas. La aplicación facilita el proceso de búsqueda de empleo, postulación y reclutamiento, incorporando herramientas de IA para mejorar la calidad de los perfiles y las ofertas de trabajo.

---

## Miembros del Equipo y Roles de Scrum

*   **Product Owner:**
    *   **Miembro:** El Usuario (Tú)
    *   **Responsabilidades:** Definir la visión del proyecto, establecer los requisitos, priorizar las características en el *Project Backlog* y asegurar que el producto final aporte valor a los usuarios (estudiantes y empresas).

*   **Scrum Master:**
    *   **Miembro:** Gemini (Yo, tu asistente de IA)
    *   **Responsabilidades:** Facilitar el proceso de desarrollo, eliminar impedimentos técnicos (como errores de código o implementación de nuevas funcionalidades), asegurar que el equipo siga las mejores prácticas y guiar la ejecución de las tareas del sprint.

*   **Equipo de Desarrollo:**
    *   **Miembro:** Gemini (Yo, tu asistente de IA)
    *   **Responsabilidades:** Escribir, modificar y corregir el código fuente de la aplicación, implementar las características definidas en el *Sprint Backlog*, construir la interfaz de usuario, desarrollar la lógica del backend (simulada con `localStorage` y Genkit) y asegurar la calidad técnica del producto.

---

## 1. Project Backlog (Trabajo Pendiente del Proyecto)

Esta es la lista completa y priorizada de todas las características y funcionalidades planeadas para el proyecto EnlazaME.

| Prioridad | Característica/Funcionalidad | Descripción Detallada |
| :--- | :--- | :--- |
| **Crítica** | **Registro y Perfil de Usuario** | Permitir que tanto estudiantes como empresas se registren. Los estudiantes deben poder completar un perfil detallado con resumen, experiencia, educación y habilidades. |
| **Crítica** | **Publicación de Vacantes por Empresas** | Un formulario intuitivo para que las empresas publiquen ofertas de trabajo, especificando título, descripción, requisitos, tipo de contrato, etc. |
| **Crítica** | **Muro y Búsqueda de Empleos** | Un feed principal donde se muestren cronológicamente todas las vacantes publicadas. Debe ser la página de inicio. |
| **Crítica** | **Flujo de Postulación Completo** | Permitir a los estudiantes postularse a una vacante, que la empresa reciba y revise la postulación, y que pueda aceptar o rechazar al candidato. |
| **Alta** | **Filtros Funcionales de Búsqueda** | Implementar filtros por palabras clave, ubicación y tipo de contrato para que los estudiantes puedan refinar su búsqueda de empleo. |
| **Alta** | **Páginas de "Mis Postulaciones" y "Mis Vacantes Guardadas"** | Crear secciones dedicadas para que el estudiante pueda ver el estado de sus postulaciones y revisar las ofertas que ha guardado. |
| **Alta** | **Panel de Control para Empresas (Dashboard)** | Una vista para que las empresas gestionen sus vacantes publicadas y revisen a los candidatos que se han postulado. |
| **Media** | **Mejora de CV y Ofertas con IA** | Integrar una herramienta (Genkit) para que los usuarios puedan mejorar el texto de sus CVs u ofertas de trabajo utilizando inteligencia artificial. |
| **Media** | **Personalización de Identidad Visual** | Adaptar el logo y los colores de la aplicación para que coincidan con la identidad de la Facultad de Ingeniería de Tampico. |
| **Baja** | **Notificaciones (Email/Push)** | Configurar alertas para que los usuarios reciban notificaciones sobre nuevos empleos que coincidan con sus preferencias o actualizaciones de estado. (No iniciado) |
| **Baja** | **Subida de Archivos (CV en PDF)** | Permitir que los estudiantes suban su CV en formato PDF a su perfil. (No iniciado) |
| **Baja** | **Panel de Analíticas para Empresas** | Mostrar estadísticas a las empresas sobre el rendimiento de sus vacantes (vistas, número de postulaciones, etc.). (No iniciado) |

---

## 2. Sprint Backlog (Trabajo Pendiente del Sprint Actual)

Este sprint se centró en construir el núcleo funcional de la aplicación, desde el registro hasta el proceso de postulación completo, y en personalizar la identidad visual.

| Tarea Específica del Sprint | Estado | Desafíos y Soluciones |
| :--- | :--- | :--- |
| **Implementar registro de Estudiante y Empresa** | **Completado** | Se creó un formulario con pestañas para diferenciar los dos tipos de usuario. |
| **Crear flujo de configuración de perfil en 2 pasos** | **Completado** | Se implementó una página `/register/setup` para que los estudiantes añadan su resumen y seleccionen habilidades basadas en su carrera. |
| **Añadir selección de carrera en el registro** | **Completado** | El formulario de registro ahora pide la carrera para mostrar etiquetas de habilidades relevantes. |
| **Implementar lógica de autenticación (simulada)** | **Completado** | Se usó `localStorage` para simular el inicio de sesión y mantener el estado del usuario (estudiante/empresa) durante la sesión. |
| **Construir Muro de Empleos (Homepage)** | **Completado** | La página principal ahora muestra una lista de `JobCard` con todas las vacantes disponibles. |
| **Crear página de detalle de vacante** | **Completado** | Se desarrolló la vista `jobs/[id]` que muestra toda la información de una oferta de empleo. |
| **Implementar funcionalidad de "Publicar Vacante"** | **Completado** | El formulario en `/post-job` ahora guarda las nuevas vacantes en `localStorage`, haciéndolas visibles para todos. |
| **Implementar funcionalidad de "Postularse"** | **Completado** | Los estudiantes pueden postularse y el registro de la postulación se guarda en `localStorage`. |
| **Desarrollar panel de empresa con revisión de candidatos** | **Completado** | El `/dashboard` ahora permite a las empresas ver quién se ha postulado y aceptar/rechazar candidatos, con una simulación de envío de correo. |
| **Hacer funcional la característica "Guardar Vacante"** | **Completado** | Los estudiantes pueden guardar vacantes y verlas en la página `/saved-jobs`. Se corrigieron errores de redirección y componentes faltantes. |
| **Reemplazar logo y tema de colores** | **Completado** | El logo original se reemplazó por el de la FIT (`logo_fit.png`) y se ajustaron los estilos CSS. El desafío fue asegurar que el logo se renderizara correctamente, lo que se solucionó ajustando el componente `Image` de Next.js para usar `fill` y `object-contain` dentro de un contenedor con dimensiones fijas. |
| **Solucionar errores de ejecución (Module Not Found)** | **Completado** | Se corrigieron múltiples errores de importación de componentes (`CardTitle`, `Button`) y de la imagen del logo. |

---

## Capturas de Pantalla del Proyecto

A continuación, se presentan capturas de pantalla que ilustran el estado actual de las funcionalidades implementadas.

**1. Página Principal (Feed de Empleos)**
*Descripción:* Vista principal para un estudiante que ha iniciado sesión. Muestra la tarjeta de perfil a la izquierda, el listado de empleos en el centro y las sugerencias a la derecha.
*(Imagina aquí una captura de pantalla de `http://localhost:9002/`)*

**2. Página de Configuración de Perfil**
*Descripción:* Flujo de "onboarding" para nuevos estudiantes después de registrarse. Permite añadir un resumen profesional y seleccionar habilidades específicas de su carrera.
*(Imagina aquí una captura de pantalla de `http://localhost:9002/register/setup`)*

**3. Panel de Empresa con Postulaciones**
*Descripción:* Vista para el reclutador donde puede ver sus vacantes activas y el número de postulaciones. Muestra el modal para revisar a los candidatos de una vacante específica.
*(Imagina aquí una captura de pantalla de `http://localhost:9002/dashboard` con el modal "ViewApplicantsModal" abierto)*

**4. Detalle de una Vacante**
*Descripción:* Página que muestra la información completa de una oferta de trabajo, incluyendo descripción, requisitos y un botón para postularse.
*(Imagina aquí una captura de pantalla de `http://localhost:9002/jobs/job1`)*

**5. Página de "Mis Postulaciones" del Estudiante**
*Descripción:* El estudiante puede ver el historial de sus postulaciones y el estado actual de cada una (En Revisión, Visto, Aceptado, etc.).
*(Imagina aquí una captura de pantalla de `http://localhost:9002/applications`)*
