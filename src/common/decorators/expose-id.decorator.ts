/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExposeOptions, Transform, TransformFnParams } from 'class-transformer';

export const ExposeId =
  (_options?: ExposeOptions) =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  (target: Object, propertyKey: string) => {
    Transform((params: TransformFnParams) => params.obj[propertyKey])(
      target,
      propertyKey,
    );
  };
