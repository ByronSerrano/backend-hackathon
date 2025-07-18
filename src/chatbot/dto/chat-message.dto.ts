import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ChatMessageDto {
  @ApiProperty({
    description: 'Mensaje que el usuario envía al chatbot',
    example: '¿Cuáles son los beneficios de Parking IA para empresas?',
    minLength: 1,
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional({
    description: 'Contexto opcional para la conversación',
    example: 'parking-ia-business',
    default: 'parking-ia-business',
  })
  @IsString()
  @IsOptional()
  context?: string;

  @ApiPropertyOptional({
    description: 'ID opcional del usuario para tracking',
    example: 'user123',
  })
  @IsString()
  @IsOptional()
  userId?: string;
}

export class ChatResponseDto {
  @ApiProperty({
    description: 'Respuesta generada por el chatbot IA',
    example: 'Parking IA ofrece múltiples beneficios para empresas: optimización de espacios de estacionamiento, reducción del tiempo de búsqueda de parking, mejora de la experiencia de empleados y visitantes, y generación de reportes de ocupación en tiempo real.',
  })
  message: string;

  @ApiProperty({
    description: 'Timestamp de cuando se generó la respuesta',
    example: '2024-01-15T10:30:00.000Z',
  })
  timestamp: Date;

  @ApiPropertyOptional({
    description: 'Contexto de la conversación',
    example: 'parking-ia-business',
  })
  context?: string;
}

export class BusinessInfoDto {
  @ApiProperty({
    description: 'Número total de usuarios registrados',
    example: 150,
  })
  totalUsers: number;

  @ApiProperty({
    description: 'Descripción de actividad reciente del sistema',
    example: '12 nuevos usuarios en las últimas 24 horas',
  })
  recentActivity: string;

  @ApiProperty({
    description: 'Lista de características principales del sistema',
    example: [
      'Detección en tiempo real',
      'Dashboard web',
      'API REST',
      'Reportes y analytics',
      'Notificaciones automáticas',
    ],
    type: [String],
  })
  features: string[];

  @ApiProperty({
    description: 'Mercados objetivo del sistema',
    example: ['Empresas', 'Universidades', 'Centros comerciales', 'Hospitales'],
    type: [String],
  })
  targetMarkets: string[];
}

export class HealthCheckDto {
  @ApiProperty({
    description: 'Estado del servicio',
    example: 'ok',
    enum: ['ok', 'error'],
  })
  status: string;

  @ApiProperty({
    description: 'Mensaje descriptivo del estado',
    example: 'Chatbot service is running',
  })
  message: string;

  @ApiProperty({
    description: 'Timestamp del health check',
    example: '2024-01-15T10:30:00.000Z',
  })
  timestamp: Date;
}
