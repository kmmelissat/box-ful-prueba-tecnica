# 📦 Boxful - Prueba Técnica (Frontend)

Este proyecto es el **frontend** de la prueba técnica para Boxful. Desarrollado con **Next.js** y **Ant Design**, implementa un formulario dividido en dos pasos, con validaciones y visualización dinámica de datos.

---

## 🖼️ Vistas implementadas

### ✅ Paso 1: Formulario de datos personales
- Dirección
- Fecha
- Nombre
- Correo electrónico
- Teléfono
- Departamento y municipio (selects dinámicos)

### ✅ Paso 2: Listado de paquetes
- Entrada dinámica de bultos con:
  - Largo, alto, ancho
  - Peso
  - Contenido (editable)
- Los paquetes se muestran debajo con opción de editar/eliminar.
- Al finalizar, se envían todos los datos a una **API NestJS**.

---

## 🚀 Tecnologías utilizadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Ant Design](https://ant.design/)
- [Zustand](https://github.com/pmndrs/zustand) (manejo de estado entre pasos)
- [React Hook Form] + `Form` de AntD (para validación por paso)
- `fetch` para conexión a la API (en desarrollo)

---

## 📦 Instalación

```bash
git clone https://github.com/kmmelissat/box-ful-prueba-tecnica
cd box-ful-prueba-tecnica
npm install
npm run dev
