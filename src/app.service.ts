import { Injectable } from '@nestjs/common';
import { getObjectIDs, getResponseByObjectIDs } from './common';

@Injectable()
export class AppService {
  async getHello(): Promise<void> {
    const objectIDs = await getObjectIDs();
    const objects = await getResponseByObjectIDs(objectIDs);
    console.log('objects', objects);
  }
}
