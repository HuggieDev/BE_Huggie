import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './commons/filter/http-exception.filter'

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
    await app.listen(3000)
}
bootstrap()
