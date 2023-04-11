import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './apis/auth/auth.module'
import { UsersModule } from './apis/users/users.module'
import { ReviewsModule } from './apis/reviews/reviews.module'
import { StoreModule } from './apis/stores/stores.module'
import { ReviewImagesModule } from './apis/reviewImages/reviewImages.module'
import { ReviewMenusModule } from './apis/reviewMenus/reviewMenus.module'

@Module({
    imports: [
        AuthModule,
        UsersModule,
        StoreModule,
        ReviewImagesModule,
        ReviewMenusModule,
        ReviewsModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: process.env.DATABASE_TYPE as 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            entities: [__dirname + '/apis/**/*.entity.*'],
            synchronize: true,
            logging: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
