# 🚀 Referencia Rápida - Chatbot Endpoints

## 📍 URLs Base
- **Desarrollo:** `http://localhost:3000`
- **Producción:** `https://tu-dominio.com`

---

## 🎯 Endpoints Resumidos

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/chatbot/message` | Enviar mensaje al chatbot | ❌ |
| `GET` | `/chatbot/business-info` | Obtener info del negocio | ❌ |
| `GET` | `/chatbot/health` | Health check del servicio | ❌ |

---

## ⚡ Ejemplos Rápidos

### 💬 Enviar Mensaje
```bash
curl -X POST http://localhost:3000/chatbot/message \
  -H "Content-Type: application/json" \
  -d '{"message": "¿Qué es Parking IA?"}'
```

### 📊 Info del Negocio
```bash
curl http://localhost:3000/chatbot/business-info
```

### ❤️ Health Check
```bash
curl http://localhost:3000/chatbot/health
```

---

## 📱 Frontend JavaScript

```javascript
// Función simple para enviar mensaje
const sendMessage = async (message) => {
  const response = await fetch('http://localhost:3000/chatbot/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, context: 'parking-ia-business' })
  });
  return response.json();
};

// Uso
sendMessage('¿Cómo funciona el parking IA?')
  .then(data => console.log(data.message));
```

---

## 🔧 Variables de Entorno

```env
# Mínimo requerido
OPENROUTER_API_KEY=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

# Para estadísticas completas
DB_HOST=ep-polished-paper-a8floh5k-pooler.eastus2.azure.neon.tech
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tu_database
```

---

## ✅ Testing Checklist

- [ ] Health check funciona
- [ ] Business info retorna datos
- [ ] Mensaje simple funciona
- [ ] Mensaje con contexto funciona
- [ ] Errores se manejan correctamente

---

## 🚨 Troubleshooting

### ❌ "Cannot connect to OpenRouter"
- Verificar `OPENROUTER_API_KEY` en `.env`
- Revisar conexión a internet

### ❌ "Database connection failed"
- Verificar credenciales de BD en `.env`
- Confirmar que la BD esté activa

### ❌ "CORS error"
- Agregar frontend URL a CORS whitelist
- Verificar headers de request

---

## 🎨 Respuestas de Ejemplo

### Mensaje Exitoso:
```json
{
  "message": "Parking IA utiliza inteligencia artificial...",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "context": "parking-ia-business"
}
```

### Business Info:
```json
{
  "totalUsers": 150,
  "recentActivity": "12 nuevos usuarios en 24h",
  "features": ["Detección en tiempo real", "Dashboard web", "..."],
  "targetMarkets": ["Empresas", "Universidades", "..."]
}
```

### Health Check:
```json
{
  "status": "ok",
  "message": "Chatbot service is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
``` 