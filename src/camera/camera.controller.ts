import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CameraService } from './camera.service';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';

@Controller('camera')
export class CameraController {
  constructor(private readonly cameraService: CameraService) {}

  @Post()
  create(@Body() createCameraDto: CreateCameraDto) {
    return this.cameraService.create(createCameraDto);
  }

  @Get('all-data')
  findAll() {
    return this.cameraService.findAll();
  }

  @Get('total-space')
  findOne() {
    return this.cameraService.findOne();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCameraDto: UpdateCameraDto) {
    return this.cameraService.update(+id, updateCameraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cameraService.remove(+id);
  }
}
