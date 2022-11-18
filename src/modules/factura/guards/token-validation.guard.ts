import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private config: ConfigService) {}
  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];
      if (token === this.config.get<string>('AUTH_TOKEN')) {
        return true;
      }
      console.log('forbiden');
      return false;
    } catch (error) {
      console.log('error:', error.message);
      throw new HttpException('not allowed', HttpStatus.FORBIDDEN);
    }
  }
}
