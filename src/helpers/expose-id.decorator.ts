import { ExposeOptions, Transform, TransformFnParams } from 'class-transformer';

export const ExposeId =
  (options?: ExposeOptions) =>
  // tslint:disable-next-line: ban-types
  (target: Object, propertyKey: string) => {
    Transform((params: TransformFnParams) => params.obj[propertyKey])(
      target,
      propertyKey
    );
  };
