import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ChatbotService } from './chatbot.service';
import {
  ChatMessageDto,
  ChatResponseDto,
  BusinessInfoDto,
  HealthCheckDto,
} from './dto/chat-message.dto';

@ApiTags('Chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('message')
  @ApiOperation({
    summary: 'Enviar mensaje al chatbot',
    description: 'Envía un mensaje al chatbot especializado en Parking IA y recibe una respuesta generada por inteligencia artificial basada en el contexto del negocio.',
  })
  @ApiBody({
    type: ChatMessageDto,
    description: 'Datos del mensaje a enviar al chatbot',
    examples: {
             basic: {
         summary: 'Mensaje básico',
         value: {
           message: '¿Qué es Parking IA?',
         },
       },
       complete: {
         summary: 'Mensaje completo',
         value: {
           message: '¿Cuáles son los beneficios de Parking IA para empresas?',
           context: 'parking-ia-business',
           userId: 'user123',
         },
       },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Mensaje procesado exitosamente',
    type: ChatResponseDto,
          examples: {
        success: {
          summary: 'Respuesta exitosa',
          value: {
            message: 'Parking IA ofrece múltiples beneficios para empresas: optimización de espacios de estacionamiento, reducción del tiempo de búsqueda de parking, mejora de la experiencia de empleados y visitantes, y generación de reportes de ocupación en tiempo real. Nuestro sistema utiliza IA y visión computacional para detectar automáticamente la ocupación de espacios.',
            timestamp: '2024-01-15T10:30:00.000Z',
            context: 'parking-ia-business',
          },
        },
      },
  })
  @ApiBadRequestResponse({
    description: 'Datos de entrada inválidos',
          examples: {
        emptyMessage: {
          summary: 'Mensaje vacío',
          value: {
            statusCode: 400,
            message: ['message should not be empty'],
            error: 'Bad Request',
          },
        },
        invalidType: {
          summary: 'Tipo de dato inválido',
          value: {
            statusCode: 400,
            message: ['message must be a string'],
            error: 'Bad Request',
          },
        },
      },
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno del servidor',
    examples: {
      serverError: {
        summary: 'Error del servidor',
        value: {
          statusCode: 500,
          message: 'Error al procesar el mensaje',
        },
      },
    },
  })
  async sendMessage(
    @Body() chatMessageDto: ChatMessageDto,
  ): Promise<ChatResponseDto> {
    try {
      return await this.chatbotService.sendMessage(chatMessageDto);
    } catch (error) {
      throw new HttpException(
        'Error al procesar el mensaje',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('business-info')
  @ApiOperation({
    summary: 'Obtener información del negocio',
    description: 'Obtiene estadísticas y datos del negocio de Parking IA, incluyendo número de usuarios, actividad reciente, características del sistema y mercados objetivo.',
  })
  @ApiResponse({
    status: 200,
    description: 'Información del negocio obtenida exitosamente',
    type: BusinessInfoDto,
    examples: {
             success: {
         summary: 'Información del negocio',
         value: {
           totalUsers: 150,
           recentActivity: '12 nuevos usuarios en las últimas 24 horas',
           features: [
             'Detección en tiempo real',
             'Dashboard web',
             'API REST',
             'Reportes y analytics',
             'Notificaciones automáticas',
           ],
           targetMarkets: [
             'Empresas',
             'Universidades',
             'Centros comerciales',
             'Hospitales',
           ],
         },
       },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Error al obtener datos del negocio',
         examples: {
       dbError: {
         summary: 'Error de base de datos',
         value: {
           statusCode: 500,
           message: 'Error al obtener información del negocio',
         },
       },
     },
  })
  async getBusinessInfo(): Promise<BusinessInfoDto> {
    try {
      return await this.chatbotService.getBusinessInfo();
    } catch (error) {
      throw new HttpException(
        'Error al obtener información del negocio',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('health')
  @ApiOperation({
    summary: 'Health check del servicio',
    description: 'Verifica que el servicio del chatbot esté funcionando correctamente. Útil para monitoreo y verificación de estado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Servicio funcionando correctamente',
    type: HealthCheckDto,
         examples: {
       healthy: {
         summary: 'Servicio saludable',
         value: {
           status: 'ok',
           message: 'Chatbot service is running',
           timestamp: '2024-01-15T10:30:00.000Z',
         },
       },
     },
  })
  @ApiInternalServerErrorResponse({
    description: 'Servicio con problemas',
         examples: {
       unhealthy: {
         summary: 'Servicio con problemas',
         value: {
           statusCode: 500,
           message: 'Chatbot service is not working properly',
         },
       },
     },
  })
  async getHealth(): Promise<HealthCheckDto> {
    return {
      status: 'ok',
      message: 'Chatbot service is running',
      timestamp: new Date(),
    };
  }
}