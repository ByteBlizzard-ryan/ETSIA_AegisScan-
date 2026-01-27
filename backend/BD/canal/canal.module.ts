import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Canal } from './canal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Canal])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule], // pour être utilisé dans d'autres modules si nécessaire
})
export class CanalModule {}
