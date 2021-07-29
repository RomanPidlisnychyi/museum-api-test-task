import axios from 'axios';
import { BadRequestException, NotFoundException } from '@nestjs/common';

axios.defaults.baseURL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export const getObjectIDs = async (departmentId: number) => {
  try {
    const response = await axios(`/objects?departmentIds=${departmentId}`);
    return response.data?.objectIDs;
  } catch (err) {
    throw new BadRequestException(err);
  }
};

export const getResponseByObjectIDs = async (objectIDs: number[], quantity: number) => {
  const oneHundredObjectIDs = objectIDs.filter((_, index) => index < quantity);
  if (!oneHundredObjectIDs.length) {
    throw new NotFoundException('ObjectIDs not found');
  }

  return Promise.all(
    oneHundredObjectIDs.map((objectID) => axios(`/objects/${objectID}`).then((response) => response.data)),
  );
};
