import axios from 'axios';
import {checkNetwork} from '../NetworkHelpers/NetworkHelper';
import {Response} from '../ResponseHelper/ResponseClass';

export const RequestHelper = async (url: string) => {
  const checkNet = await checkNetwork();

  const responseObject = new Response().ResponseObject('', false, []);
  if (checkNet) {
    try {
      const resp = await axios.request({url: url});
      switch (resp.status) {
        case 200:
          responseObject.data = resp.data;
          break;
        case 404:
          responseObject.error = true;
          responseObject.errorMessage =
            'Object not found: Game or Endpoint not found.';
          break;
        case 500:
          responseObject.error = true;
          responseObject.errorMessage =
            'Something went wrong. Unexpected error.';
          break;
        default:
          responseObject.error = true;
          responseObject.errorMessage =
            'Something went wrong. Unexpected error.';
          break;
      }
    } catch (error) {
      responseObject.error = true;
      responseObject.errorMessage = 'Something went wrong. Unexpected error.';
    }
  } else {
    responseObject.error = true;
    responseObject.errorMessage = 'Please check your network connection.';
  }
  return responseObject;
};
