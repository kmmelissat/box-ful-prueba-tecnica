# 🌐 Boxful Frontend - Prueba Técnica

Este es el frontend de la prueba técnica de **Boxful**, desarrollado con **Next.js**, **Ant Design** y **Zustand**. Contiene:

- Formulario multipaso (2 vistas)
- Registro y login de usuario con JWT
- Almacenamiento global de estado del formulario
- Envío de datos autenticado a API en NestJS

---

## 🚀 Tecnologías

- [Next.js](https://nextjs.org/) — Framework React
- [Ant Design](https://ant.design/) — UI elegante
- [Zustand](https://zustand-demo.pmnd.rs/) — Estado global
- [Day.js](https://day.js.org/) — Manejo de fechas
- [TypeScript](https://www.typescriptlang.org/) — Tipado moderno

---

## 📁 Estructura del Proyecto

pages/ ├── login.tsx # Vista de inicio de sesión ├── register.tsx # Vista de registro ├── form.tsx # Formulario paso 1 ├── form2.tsx # Formulario paso 2 store/ ├── useFormStore.ts # Estado del formulario ├── useAuthStore.ts # Estado de autenticación components/ ├── PageLayout.tsx # Layout reutilizable ├── FormContainer.tsx # Contenedor estilizado del form public/ ├── login-image.png # Imagen decorativa ├── box-icon.svg # Icono de caja

yaml
Copy
Edit

---

## ⚙️ Instalación

```bash
git clone https://github.com/tu-usuario/boxful-frontend.git
cd boxful-frontend
npm install
npm run dev

🌈 Funcionalidades
✅ Registro de usuario
✅ Login con guardado de token (JWT)
✅ Protección de rutas (/form, /form2)
✅ Envío de datos con validación
✅ Diseño responsive con Ant Design
✅ Imagen decorativa para login y register
✅ Logout automático disponible vía Zustand

🔐 Autenticación
El token JWT se guarda en Zustand + localStorage

Al acceder a rutas protegidas, se valida sesión automáticamente

Envío de datos incluye cabecera Authorization: Bearer <token>

📬 Datos enviados al backend
json
Copy
Edit
{
  "pickupAddress": "Colonia Roma Norte",
  "scheduledDate": "2025-04-10T10:00:00.000Z",
  "firstName": "Melissa",
  "lastName": "Torres",
  "email": "melissa@example.com",
  "phone": "+50371234567",
  "deliveryAddress": "Zona Rosa",
  "department": "San Salvador",
  "municipality": "San Salvador",
  "referencePoint": "Frente al parque",
  "instructions": "Llamar al llegar",
  "packages": [
    {
      "content": "Zapatos",
      "weight": 2.5,
      "length": 30,
      "height": 10,
      "width": 20
    }
  ]
}
✨ Autora
Frontend desarrollado con 💛 por Karla Melissa Torres Solorzano
Con mucho diseño, estructura clara y amor por el UX ✨

css
Copy
Edit
