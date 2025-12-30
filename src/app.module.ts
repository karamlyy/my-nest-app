import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    // 1. Env fayllarını oxumaq üçün
    ConfigModule.forRoot({
      isGlobal: true, // Bütün modullarda əlçatan olsun
    }),
    
    // 2. Database bağlantısı (Async istifadə edirik ki, ConfigService işə düşsün)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true, // Entity-ləri avtomatik tapır
        synchronize: true, // DİQQƏT: Production-da bunu 'false' edin, migration istifadə edin. Sadə app üçün 'true' qalsın.
      }),
    }),
    
    TodoModule,
  ],
})
export class AppModule {}