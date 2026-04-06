// src/modules-educatifs/modules-educatifs.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'; // Ajout de NotFoundException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEducatif } from './modules_educatifs.entity'; // Vérifiez bien le nom du fichier !

@Injectable()
export class ModulesEducatifsService {
  constructor(
    @InjectRepository(ModuleEducatif)
    private readonly moduleRepository: Repository<ModuleEducatif>,
  ) {}

  findAll(): Promise<ModuleEducatif[]> {
    return this.moduleRepository.find({
      order: { date_creation: 'DESC' }
    });
  }

  async findOne(id: string): Promise<ModuleEducatif | null> {
    const module = await this.moduleRepository.findOne({ 
      where: { id_module: id as any } // Le "as any" aide parfois si TS se plaint du type UUID
    });

    if (!module) {
      throw new NotFoundException(`Le module avec l'ID ${id} n'existe pas`);
    }

    return module;
  }
}