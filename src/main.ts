import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './commons/filter/http-exception.filter'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalFilters(new HttpExceptionFilter())
    app.useGlobalPipes(
        new ValidationPipe({
            disableErrorMessages: false, //TODO: 추후 env로 관리
            whitelist: true, // 요구하지 않은 인풋은 제거
            transform: true,
        })
    )

    const options = new DocumentBuilder()
        .setTitle('restaurant map API Docs')
        .setDescription('restaurant map API description')
        .setVersion('1.0')
        .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api-docs', app, document)

    await app.listen(3000)
}
bootstrap()
