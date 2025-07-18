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
      { count_cars: 36, empty_spaces: 2, time_video_sg: '00:00:01' },
      { count_cars: 35, empty_spaces: 3, time_video_sg: '00:00:02' },
      { count_cars: 35, empty_spaces: 3, time_video_sg: '00:00:03' },
      { count_cars: 34, empty_spaces: 4, time_video_sg: '00:00:04' },
      { count_cars: 34, empty_spaces: 4, time_video_sg: '00:00:05' },
      { count_cars: 33, empty_spaces: 5, time_video_sg: '00:00:06' },
      { count_cars: 33, empty_spaces: 5, time_video_sg: '00:00:07' },
      { count_cars: 32, empty_spaces: 6, time_video_sg: '00:00:08' },
      { count_cars: 32, empty_spaces: 6, time_video_sg: '00:00:09' },
      { count_cars: 31, empty_spaces: 7, time_video_sg: '00:00:10' },
      { count_cars: 31, empty_spaces: 7, time_video_sg: '00:00:11' },
      { count_cars: 30, empty_spaces: 8, time_video_sg: '00:00:12' },
      { count_cars: 30, empty_spaces: 8, time_video_sg: '00:00:13' },
      { count_cars: 29, empty_spaces: 9, time_video_sg: '00:00:14' },
      { count_cars: 29, empty_spaces: 9, time_video_sg: '00:00:15' },
      { count_cars: 28, empty_spaces: 10, time_video_sg: '00:00:16' },
      { count_cars: 28, empty_spaces: 10, time_video_sg: '00:00:17' },
      { count_cars: 27, empty_spaces: 11, time_video_sg: '00:00:18' },
      { count_cars: 27, empty_spaces: 11, time_video_sg: '00:00:19' },
      { count_cars: 26, empty_spaces: 12, time_video_sg: '00:00:20' },
      { count_cars: 26, empty_spaces: 12, time_video_sg: '00:00:21' },
      { count_cars: 25, empty_spaces: 13, time_video_sg: '00:00:22' },
      { count_cars: 25, empty_spaces: 13, time_video_sg: '00:00:23' },
      { count_cars: 24, empty_spaces: 14, time_video_sg: '00:00:24' },
      { count_cars: 24, empty_spaces: 14, time_video_sg: '00:00:25' },
      { count_cars: 23, empty_spaces: 15, time_video_sg: '00:00:26' },
      { count_cars: 23, empty_spaces: 15, time_video_sg: '00:00:27' },
      { count_cars: 22, empty_spaces: 16, time_video_sg: '00:00:28' },
      { count_cars: 22, empty_spaces: 16, time_video_sg: '00:00:29' },
      { count_cars: 25, empty_spaces: 13, time_video_sg: '00:00:30' },
      { count_cars: 25, empty_spaces: 13, time_video_sg: '00:00:31' },
      { count_cars: 25, empty_spaces: 13, time_video_sg: '00:00:32' },
      { count_cars: 25, empty_spaces: 13, time_video_sg: '00:00:33' },
      { count_cars: 25, empty_spaces: 13, time_video_sg: '00:00:34' },
      { count_cars: 25, empty_spaces: 13, time_video_sg: '00:00:35' },
      { count_cars: 25, empty_spaces: 13, time_video_sg: '00:00:36' },
      { count_cars: 25, empty_spaces: 13, time_video_sg: '00:00:37' },
      { count_cars: 25, empty_spaces: 13, time_video_sg: '00:00:38' },
      { count_cars: 25, empty_spaces: 13, time_video_sg: '00:00:39' },
      { count_cars: 25, empty_spaces: 13, time_video_sg: '00:00:40' }
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
