import { ApiProperty } from '@nestjs/swagger';

export class CreateCameraDto {
  @ApiProperty({
    description: 'The filename of the camera video/image',
    example: 'camera_01_video.mp4',
  })
  filename: string;

  @ApiProperty({
    description: 'The physical location of the camera',
    example: 'Entrance Gate A',
  })
  location: string;
}
