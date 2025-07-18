# 🚗 Sistema Backend de Gestión de Parking Inteligente

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

## 📋 Descripción

Sistema backend desarrollado con **NestJS** para la gestión integral de usuarios en un sistema de parking inteligente. Este sistema está diseñado para trabajar en conjunto con una **IA de visión por computadora** que analiza las cámaras del establecimiento para administrar automáticamente los espacios de parqueo.

### 🎯 Características Principales

- **Gestión de Usuarios**: Registro, autenticación y autorización de usuarios
- **API RESTful**: Endpoints seguros y bien documentados con Swagger
- **Autenticación JWT**: Sistema de tokens para sesiones seguras
- **Base de Datos PostgreSQL**: Almacenamiento robusto y escalable
- **Integración con IA**: Preparado para conectar con sistemas de visión por computadora
- **Middleware de Seguridad**: Protección de rutas y validación de datos
- **Docker Ready**: Configuración lista para contenedores

### 🏗️ Arquitectura del Sistema

Este backend forma parte de un ecosistema más amplio que incluye:
- 📷 **Sistema de Cámaras**: Monitoreo en tiempo real del parking
- 🤖 **IA de Visión por Computadora**: Detección y análisis de vehículos
- 🔧 **API Backend**: Gestión de datos y lógica de negocio (este proyecto)
- 📱 **Frontend/Dashboard**: Interfaz de usuario para administradores

## 🚀 Configuración del Proyecto

### Prerrequisitos
- Node.js (v18 o superior)
- PostgreSQL
- Docker (opcional)

### Instalación

```bash
# Clonar el repositorio
$ git clone <repository-url>

# Instalar dependencias
$ npm install

# Configurar variables de entorno
$ cp .env.example .env
# Editar .env con tus configuraciones de base de datos
```

## 🛠️ Ejecución del Proyecto

```bash
# Desarrollo
$ npm run start

# Modo watch (recomendado para desarrollo)
$ npm run start:dev

# Modo producción
$ npm run start:prod

# Con Docker
$ docker-compose up -d
```

## 📚 API Documentation

Una vez que el servidor esté ejecutándose, puedes acceder a la documentación interactiva de Swagger en:

```
http://localhost:3000/api
```

## 🤝 Equipo de Desarrollo

Este proyecto fue desarrollado por:

- **Byron Serrano** - Desarrollador Backend
- **Alejandro Zea** - Desarrollador Backend  
- **Christian Encalada** - Desarrollador Backend
- **Julio Vinces** - Desarrollador Backend

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🌟 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
