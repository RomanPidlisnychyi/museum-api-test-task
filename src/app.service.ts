import { Injectable } from '@nestjs/common';
import {
  getObjectIDs,
  getResponseByObjectIDs,
  getNeededFieldsFromApiResponse,
  getInfoFromImage,
  MainResponse,
  MainRequestType,
} from './common';

@Injectable()
export class AppService {
  async getTransformedApiResponse(dto: MainRequestType): Promise<MainResponse[]> {
    const objectIDs = await getObjectIDs(dto.department);
    const objects = await getResponseByObjectIDs(objectIDs, dto.quantityObjectsInResponse);
    const needFields = getNeededFieldsFromApiResponse(objects);
    return getInfoFromImage(needFields);
  }
}
