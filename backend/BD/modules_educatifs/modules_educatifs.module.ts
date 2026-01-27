import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleEducatif } from './modules_educatifs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEducatif])],
  exports: [TypeOrmModule],
})
export class ModulesEducatifsModule {}
