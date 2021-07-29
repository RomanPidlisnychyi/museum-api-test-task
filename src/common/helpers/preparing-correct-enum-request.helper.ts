import { QUANTITY, API_DEPARTMENT_ID, MainRequest, MainRequestType } from '../';

export const preparingCorrectEnumRequest = (request: MainRequest): any => ({
  ...request,
  department: API_DEPARTMENT_ID[request.department],
  quantityObjectsInResponse: QUANTITY[request.quantityObjectsInResponse],
});
