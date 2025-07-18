import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import axios from 'axios';
import { ChatMessageDto, ChatResponseDto } from './dto/chat-message.dto';

@Injectable()
export class ChatbotService {
  private readonly openRouterApiKey: string;
  private readonly openRouterBaseUrl = 'https://openrouter.ai/api/v1';

  constructor(
    private configService: ConfigService,
    @InjectDataSource() private dataSource: DataSource,
  ) {
    this.openRouterApiKey = this.configService.get<string>('OPENROUTER_API_KEY') || '';
    if (!this.openRouterApiKey) {
      console.warn('OPENROUTER_API_KEY no está configurada en las variables de entorno');
    }
  }

  async sendMessage(chatMessageDto: ChatMessageDto): Promise<ChatResponseDto> {
    try {
      const { message, context, userId } = chatMessageDto;

      // Crear contexto específico del negocio de parking
      const businessContext = await this.generateBusinessContext();

      // Crear el prompt con contexto del negocio
      const systemPrompt = `Eres un asistente especializado en el negocio de Parking IA, una solución de detección de parking en tiempo real para empresas, universidades y organizaciones. 

Tu función es ayudar a los usuarios con:
- Información sobre el sistema de detección de parking en tiempo real
- Beneficios para empresas y universidades
- Características técnicas del sistema
- Datos y estadísticas del parking
- Consultas sobre espacios disponibles
- Optimización de espacios de estacionamiento

Contexto del negocio:
${businessContext}

Responde de manera profesional, útil y enfocada en el negocio de parking inteligente.`;

      const response = await axios.post(
        `${this.openRouterBaseUrl}/chat/completions`,
        {
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: message,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${this.openRouterApiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:3000',
            'X-Title': 'Parking IA Chatbot',
          },
        },
      );

      const assistantMessage = response.data.choices[0].message.content;

      return {
        message: assistantMessage,
        timestamp: new Date(),
        context: context || 'parking-ia-business',
      };
    } catch (error) {
      console.error('Error al comunicarse con OpenRouter:', error);
      throw new HttpException(
        'Error al procesar el mensaje del chat',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async generateBusinessContext(): Promise<string> {
    try {
      // Obtener datos relevantes de la base de datos
      const userCount = await this.getUserCount();
      const recentActivity = await this.getRecentActivity();

      return `
Parking IA es una solución innovadora de detección de parking en tiempo real que ayuda a:

EMPRESAS:
- Optimizar el uso de espacios de estacionamiento
- Reducir el tiempo de búsqueda de parking
- Mejorar la experiencia de empleados y visitantes
- Generar reportes de ocupación en tiempo real

UNIVERSIDADES:
- Gestionar eficientemente los espacios para estudiantes y personal
- Reducir el tráfico interno del campus
- Proporcionar información en tiempo real sobre disponibilidad
- Integración con sistemas académicos

CARACTERÍSTICAS TÉCNICAS:
- Detección en tiempo real usando IA y visión computacional
- Dashboard web para monitoreo
- API REST para integraciones
- Notificaciones automáticas
- Reportes y analytics

DATOS ACTUALES:
- Usuarios registrados: ${userCount}
- Actividad reciente: ${recentActivity}

El sistema utiliza tecnología avanzada de machine learning para detectar automáticamente la ocupación de espacios de parking mediante cámaras y sensores.
      `;
    } catch (error) {
      console.error('Error al generar contexto del negocio:', error);
      return 'Parking IA es una solución de detección de parking en tiempo real para empresas y universidades.';
    }
  }

  private async getUserCount(): Promise<number> {
    try {
      const result = await this.dataSource.query('SELECT COUNT(*) as count FROM "user"');
      return parseInt(result[0].count) || 0;
    } catch (error) {
      return 0;
    }
  }

  private async getRecentActivity(): Promise<string> {
    try {
      // Ejemplo de consulta de actividad reciente - ajusta según tu esquema de BD
      const result = await this.dataSource.query(`
        SELECT COUNT(*) as count 
        FROM "user" 
        WHERE created_at > NOW() - INTERVAL '24 hours'
      `);
      const recentUsers = parseInt(result[0].count) || 0;
      return `${recentUsers} nuevos usuarios en las últimas 24 horas`;
    } catch (error) {
      return 'Sistema funcionando correctamente';
    }
  }

  async getBusinessInfo(): Promise<any> {
    try {
      const userCount = await this.getUserCount();
      const recentActivity = await this.getRecentActivity();

      return {
        totalUsers: userCount,
        recentActivity,
        features: [
          'Detección en tiempo real',
          'Dashboard web',
          'API REST',
          'Reportes y analytics',
          'Notificaciones automáticas',
        ],
        targetMarkets: ['Empresas', 'Universidades', 'Centros comerciales', 'Hospitales'],
      };
    } catch (error) {
      throw new HttpException(
        'Error al obtener información del negocio',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}