import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleEducatif } from './modules_educatifs.entity';
import { ModulesEducatifsController } from './modules-educatifs.controller'; // À AJOUTER
import { ModulesEducatifsService } from './modules-educatifs.service';       // À AJOUTER

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEducatif])],
  controllers: [ModulesEducatifsController], 
  providers: [ModulesEducatifsService],    
  exports: [ModulesEducatifsService], 
})
export class ModulesEducatifsModule {}