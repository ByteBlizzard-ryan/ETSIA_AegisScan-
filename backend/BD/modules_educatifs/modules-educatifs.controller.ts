// src/modules-educatifs/modules-educatifs.controller.ts
import { Controller, Get, Param } from '@nestjs/common'; // <-- Ajoutez Param ici
import { ModulesEducatifsService } from './modules-educatifs.service';

@Controller('modules-educatifs')
export class ModulesEducatifsController {
  constructor(private readonly modulesService: ModulesEducatifsService) {}

  @Get()
  findAll() {
    return this.modulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulesService.findOne(id);
  }
}