import * as fetch from 'node-fetch';
import { configService } from '../../config';
import { NotFoundException } from '@nestjs/common';

const baseApiURL = 'https://collectionapi.metmuseum.org/public/collection/v1';
const options = {
  headers: {
    Cookie: configService.getCookie(),
  },
};

export const getObjectIDs = () => {
  return fetch(`${baseApiURL}/objects?departmentIds=11`, options)
    .then((res) => res.json())
    .then((data) => data.objectIDs);
};

export const getResponseByObjectIDs = async (objectIDs: number[]) => {
  const oneHundredObjectIDs = objectIDs.filter((_, index) => index < 20);
  if (!oneHundredObjectIDs.length) {
    throw new NotFoundException('ObjectIDs not found');
  }

  const arrayObjects = await Promise.all(
    oneHundredObjectIDs.map((objectID) =>
      fetch(`${baseApiURL}/objects/${objectID}`, options).then((res) => res.json()),
    ),
  );

  return arrayObjects;
};
