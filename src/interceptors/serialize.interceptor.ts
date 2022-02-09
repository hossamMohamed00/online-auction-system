import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

//? Define interface to ensure that the type of the incoming dto is  class
interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new serializeInterceptor(dto));
}

export class serializeInterceptor implements NestInterceptor {
  /**
   * Accept any dto to serialize
   * @param dto - Any dto to serialize the response as it.
   */
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((outgoingData: any) => {
        return plainToInstance(this.dto, outgoingData, {
          excludeExtraneousValues: true
        });
      })
    );
  }
}
