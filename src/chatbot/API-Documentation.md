# 📚 Documentación API - Chatbot Parking IA

## 🎯 Base URL
```
http://localhost:3000
```

## 🔐 Autenticación
Los endpoints del chatbot son **públicos** y no requieren autenticación.

---

## 📋 Endpoints Disponibles

### 1. 💬 **Enviar Mensaje al Chatbot**

**Endpoint:** `POST /chatbot/message`

**Descripción:** Envía un mensaje al chatbot y recibe una respuesta generada por IA especializada en Parking IA.

#### Request Body:
```json
{
  "message": "string (requerido)",
  "context": "string (opcional)", 
  "userId": "string (opcional)"
}
```

#### Response:
```json
{
  "message": "string",
  "timestamp": "Date",
  "context": "string"
}
```

#### Ejemplo de Request:
```bash
curl -X POST http://localhost:3000/chatbot/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "¿Cuáles son los beneficios de Parking IA para empresas?",
    "context": "parking-ia-business",
    "userId": "user123"
  }'
```

#### Ejemplo de Response:
```json
{
  "message": "Parking IA ofrece múltiples beneficios para empresas: optimización de espacios de estacionamiento, reducción del tiempo de búsqueda de parking, mejora de la experiencia de empleados y visitantes, y generación de reportes de ocupación en tiempo real. Nuestro sistema utiliza IA y visión computacional para detectar automáticamente la ocupación de espacios.",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "context": "parking-ia-business"
}
```

#### Códigos de Estado:
- `200 OK` - Mensaje procesado exitosamente
- `400 Bad Request` - Datos de entrada inválidos
- `500 Internal Server Error` - Error en el procesamiento

---

### 2. 📊 **Obtener Información del Negocio**

**Endpoint:** `GET /chatbot/business-info`

**Descripción:** Obtiene información estadística y datos del negocio de Parking IA.

#### Response:
```json
{
  "totalUsers": "number",
  "recentActivity": "string",
  "features": ["string"],
  "targetMarkets": ["string"]
}
```

#### Ejemplo de Request:
```bash
curl -X GET http://localhost:3000/chatbot/business-info
```

#### Ejemplo de Response:
```json
{
  "totalUsers": 150,
  "recentActivity": "12 nuevos usuarios en las últimas 24 horas",
  "features": [
    "Detección en tiempo real",
    "Dashboard web",
    "API REST",
    "Reportes y analytics",
    "Notificaciones automáticas"
  ],
  "targetMarkets": [
    "Empresas",
    "Universidades", 
    "Centros comerciales",
    "Hospitales"
  ]
}
```

#### Códigos de Estado:
- `200 OK` - Información obtenida exitosamente
- `500 Internal Server Error` - Error al obtener datos

---

### 3. ❤️ **Health Check**

**Endpoint:** `GET /chatbot/health`

**Descripción:** Verifica el estado del servicio del chatbot.

#### Response:
```json
{
  "status": "string",
  "message": "string",
  "timestamp": "Date"
}
```

#### Ejemplo de Request:
```bash
curl -X GET http://localhost:3000/chatbot/health
```

#### Ejemplo de Response:
```json
{
  "status": "ok",
  "message": "Chatbot service is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Códigos de Estado:
- `200 OK` - Servicio funcionando correctamente
- `500 Internal Server Error` - Servicio con problemas

---

## 🎨 Ejemplos de Integración Frontend

### JavaScript Vanilla:
```javascript
// Enviar mensaje
async function sendMessage(message) {
  try {
    const response = await fetch('http://localhost:3000/chatbot/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        context: 'parking-ia-business'
      })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### React/Next.js:
```typescript
const useChatbot = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const sendMessage = async (message: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context: 'parking-ia-business' })
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return { sendMessage, isLoading };
};
```

### Vue.js:
```javascript
// Composable
export const useChatbot = () => {
  const isLoading = ref(false);
  
  const sendMessage = async (message) => {
    isLoading.value = true;
    try {
      const { data } = await $fetch('/chatbot/message', {
        method: 'POST',
        body: { message, context: 'parking-ia-business' }
      });
      return data;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  return { sendMessage, isLoading };
};
```

---

## 🔧 Configuración Requerida

### Variables de Entorno:
```env
# OpenRouter API (REQUERIDO)
OPENROUTER_API_KEY=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

# Base de Datos (REQUERIDO para estadísticas)
DB_HOST=ep-polished-paper-a8floh5k-pooler.eastus2.azure.neon.tech
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tu_database

# Servidor
PORT=3000
```

---

## 🤖 Modelo de IA Utilizado

**Proveedor:** OpenRouter  
**Modelo:** `meta-llama/llama-3.1-8b-instruct:free`  
**Características:**
- Modelo gratuito
- Especializado en conversaciones
- Contexto optimizado para Parking IA
- Respuestas en español

---

## 📝 Validaciones de Entrada

### POST /chatbot/message:
- `message`: String requerido, no vacío
- `context`: String opcional 
- `userId`: String opcional

### Ejemplos de mensajes válidos:
```json
// Mínimo requerido
{ "message": "Hola" }

// Completo
{ 
  "message": "¿Cómo funciona el sistema?",
  "context": "parking-ia-business",
  "userId": "user123"
}
```

---

## ⚠️ Manejo de Errores

### Errores Comunes:

#### 400 Bad Request:
```json
{
  "statusCode": 400,
  "message": [
    "message should not be empty",
    "message must be a string"
  ],
  "error": "Bad Request"
}
```

#### 500 Internal Server Error:
```json
{
  "statusCode": 500,
  "message": "Error al procesar el mensaje del chat"
}
```

---

## 🚀 Testing

### Test básico con curl:
```bash
# Health check
curl http://localhost:3000/chatbot/health

# Business info
curl http://localhost:3000/chatbot/business-info

# Send message
curl -X POST http://localhost:3000/chatbot/message \
  -H "Content-Type: application/json" \
  -d '{"message": "¿Qué es Parking IA?"}'
```

### Test con Postman:
1. Importar collection con los 3 endpoints
2. Configurar base URL: `http://localhost:3000`
3. Ejecutar requests en orden: health → business-info → message

---

## 📈 Métricas y Monitoreo

El chatbot proporciona automáticamente:
- Conteo de usuarios totales
- Actividad reciente (últimas 24h)
- Logs de errores en consola
- Timestamps de todas las respuestas

---

## 🔒 Seguridad

- **CORS**: Configurado para desarrollo local
- **Rate Limiting**: No implementado (recomendado para producción)
- **Validación**: DTOs con class-validator
- **Sanitización**: Automática en NestJS
- **API Key**: Protegida en variables de entorno

---

## 📚 Próximos Pasos

### Funcionalidades Sugeridas:
1. **Historial de conversaciones** por usuario
2. **Rate limiting** para prevenir spam
3. **Métricas avanzadas** con analytics
4. **Soporte multiidioma**
5. **Integración con base de datos** para contexto personalizado
6. **Webhooks** para notificaciones en tiempo real 