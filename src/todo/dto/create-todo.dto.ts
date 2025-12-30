import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ 
    description: 'Tapşırığın başlığı', 
    example: 'Marketdən çörək almaq' 
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    description: 'Tapşırıq bitibmi?', 
    example: false, 
    required: false,
    default: false
  })
  @IsOptional() // Bu sahə məcburi deyil
  @IsBoolean()
  isCompleted?: boolean;
}
