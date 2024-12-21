import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UUID_PATTERN } from '../../uuidHelper';

@Injectable()
export class LovKeyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!RegExp(`${'^[A-Z\d]{4}'}-${UUID_PATTERN}`).test(value)) {
      throw new BadRequestException(
        'the key should be a combination of 4 letters and a UUUID V4',
      );
    }
    return value;
  }
}
