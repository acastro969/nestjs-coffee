import { Transform } from 'class-transformer';

export function EmptyToUndefined(): PropertyDecorator {
  return Transform((value) =>
    value.value === null || value.value === '' ? undefined : value.value,
  );
}
