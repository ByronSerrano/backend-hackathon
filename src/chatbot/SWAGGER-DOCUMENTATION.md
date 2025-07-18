# 📊 Documentación Swagger - Chatbot Parking IA

## 🎯 Acceso a Swagger UI

Una vez que tengas el servidor ejecutándose, puedes acceder a la documentación interactiva de Swagger:

**URL:** `http://localhost:3000/api`

## 🚀 Cómo iniciar el servidor

1. **Configurar variables de entorno:**
   ```bash
   # Crea archivo .env en la raíz del proyecto
   DEVELOPMENT=true
   OPENROUTER_API_KEY=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
   # ... otras variables
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run start:dev
   ```

3. **Abrir Swagger UI:**
   ```
   http://localhost:3000/api
   ```

---

## 📋 Endpoints Documentados

### 🏷️ **Tag: Chatbot**

Todos los endpoints del chatbot están agrupados bajo la etiqueta "Chatbot" en Swagger UI.

#### 1. **POST /chatbot/message**
- **Descripción:** Enviar mensaje al chatbot
- **Ejemplos incluidos:**
  - Mensaje básico (solo texto)
  - Mensaje completo (con contexto y userId)
- **Respuestas documentadas:**
  - ✅ 200: Respuesta exitosa
  - ❌ 400: Error de validación
  - ❌ 500: Error interno

#### 2. **GET /chatbot/business-info**
- **Descripción:** Obtener información del negocio
- **Respuestas documentadas:**
  - ✅ 200: Información del negocio
  - ❌ 500: Error de base de datos

#### 3. **GET /chatbot/health**
- **Descripción:** Health check del servicio
- **Respuestas documentadas:**
  - ✅ 200: Servicio saludable
  - ❌ 500: Servicio con problemas

---

## 🔧 Características de la Documentación

### ✅ **DTOs Completamente Documentados:**

#### **ChatMessageDto** (Input)
```typescript
{
  message: string,      // Requerido, 1-1000 caracteres
  context?: string,     // Opcional, por defecto "parking-ia-business"
  userId?: string       // Opcional, para tracking
}
```

#### **ChatResponseDto** (Output)
```typescript
{
  message: string,      // Respuesta del chatbot
  timestamp: Date,      // Timestamp de la respuesta
  context?: string      // Contexto de la conversación
}
```

#### **BusinessInfoDto** (Output)
```typescript
{
  totalUsers: number,           // Usuarios registrados
  recentActivity: string,       // Actividad reciente
  features: string[],           // Características del sistema
  targetMarkets: string[]       // Mercados objetivo
}
```

#### **HealthCheckDto** (Output)
```typescript
{
  status: string,       // "ok" | "error"
  message: string,      // Mensaje descriptivo
  timestamp: Date       // Timestamp del check
}
```

---

## 📝 Ejemplos de Uso desde Swagger UI

### 1. **Probar el endpoint de mensaje:**
1. Expandir `POST /chatbot/message`
2. Click en "Try it out"
3. Usar ejemplo predefinido o escribir tu mensaje:
   ```json
   {
     "message": "¿Qué beneficios tiene Parking IA para universidades?"
   }
   ```
4. Click "Execute"
5. Ver la respuesta del chatbot

### 2. **Verificar información del negocio:**
1. Expandir `GET /chatbot/business-info`
2. Click "Try it out"
3. Click "Execute"
4. Ver estadísticas del sistema

### 3. **Verificar estado del servicio:**
1. Expandir `GET /chatbot/health`
2. Click "Try it out"
3. Click "Execute"
4. Confirmar que el servicio está funcionando

---

## 🎨 Ejemplos Predefinidos

Swagger UI incluye ejemplos completos para todos los endpoints:

### **Mensaje Básico:**
```json
{
  "message": "¿Qué es Parking IA?"
}
```

### **Mensaje Completo:**
```json
{
  "message": "¿Cuáles son los beneficios de Parking IA para empresas?",
  "context": "parking-ia-business",
  "userId": "user123"
}
```

### **Respuesta Típica:**
```json
{
  "message": "Parking IA ofrece múltiples beneficios para empresas...",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "context": "parking-ia-business"
}
```

---

## 🔍 Validaciones Documentadas

### **Errores de Validación (400):**
- Mensaje vacío
- Tipo de dato incorrecto
- Campos requeridos faltantes

### **Errores del Servidor (500):**
- Error de conexión con OpenRouter
- Error de base de datos
- Problemas de configuración

---

## 🚀 Generar Código Cliente

Swagger UI permite generar código cliente automáticamente:

1. **En Swagger UI, buscar el botón "Download"**
2. **Seleccionar el lenguaje:**
   - JavaScript/TypeScript
   - Python
   - Java
   - C#
   - PHP
   - Y muchos más

3. **Usar el código generado en tu proyecto**

---

## 📱 Integración con Frontend

### **Ejemplo generado para JavaScript:**
```javascript
// Auto-generado por Swagger
const ChatbotApi = {
  async sendMessage(chatMessageDto) {
    const response = await fetch('/chatbot/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(chatMessageDto)
    });
    return response.json();
  }
};
```

### **Ejemplo para TypeScript:**
```typescript
interface ChatMessageDto {
  message: string;
  context?: string;
  userId?: string;
}

interface ChatResponseDto {
  message: string;
  timestamp: Date;
  context?: string;
}

class ChatbotService {
  async sendMessage(data: ChatMessageDto): Promise<ChatResponseDto> {
    // Implementación auto-generada
  }
}
```

---

## 🔒 Consideraciones de Seguridad

- **Endpoints públicos:** No requieren autenticación
- **Rate limiting:** Recomendado para producción
- **CORS:** Configurado para desarrollo local
- **Validación:** Automática con class-validator

---

## 📊 Monitoreo y Métricas

Swagger también documenta las métricas que el chatbot proporciona:

- **Health checks** para monitoreo
- **Business info** para dashboards
- **Response times** en headers
- **Error rates** en códigos de estado

---

## 🛠️ Personalización

### **Agregar nuevos endpoints:**
1. Crear el método en el controlador
2. Agregar decoradores `@ApiOperation`, `@ApiResponse`
3. Documentar DTOs con `@ApiProperty`
4. La documentación aparecerá automáticamente en Swagger

### **Ejemplo de nuevo endpoint:**
```typescript
@Get('stats')
@ApiOperation({ summary: 'Estadísticas de uso del chatbot' })
@ApiResponse({ status: 200, description: 'Estadísticas obtenidas', type: StatsDto })
async getStats(): Promise<StatsDto> {
  // Implementación
}
```

---

## 🎯 **¡Listo para usar!**

Con esta documentación Swagger completa, tu equipo frontend puede:

1. **Explorar la API** de forma interactiva
2. **Probar endpoints** sin escribir código
3. **Generar código cliente** automáticamente
4. **Entender respuestas** con ejemplos reales
5. **Manejar errores** de forma apropiada

**¡Accede ahora a:** `http://localhost:3000/api` **y explora la documentación interactiva!** 🚀 