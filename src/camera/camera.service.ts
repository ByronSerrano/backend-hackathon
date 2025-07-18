import { Injectable } from '@nestjs/common';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';

@Injectable()
export class CameraService {
  create(createCameraDto: CreateCameraDto) {
    return 'Esto crea';
  }

  findAll() {
    return [
      {
        count_cars: 36,
        empty_spaces: 2,
        time_video_sg: '00:01:00'
      },
      {
        count_cars: 36,
        empty_spaces: 2,
        time_video_sg: '00:01:00'
      },
      {
        count_cars: 36,
        empty_spaces: 2,
        time_video_sg: '00:01:00'
      },
    ];
  }

  findOne() {
    return {
      message: 'Space in parking',
      total_count_space: 38
    };
  }

  update(id: number, updateCameraDto: UpdateCameraDto) {
    return `This action updates a #${id} camera`;
  }

  remove(id: number) {
    return `This action removes a #${id} camera`;
  }
}
