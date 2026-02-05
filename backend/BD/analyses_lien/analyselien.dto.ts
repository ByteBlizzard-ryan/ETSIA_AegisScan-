import { IsUrl, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class AnalyseLienDto {
  @IsUrl({}, { message: 'The provided string must be a valid URL' })
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  canal_source?: string;// e.g., 'email', 'browser', 'slack'
}