

import jwt from 'jsonwebtoken';
import { privKey } from '../constants/rhsret';
export const decodeToken = token => {
  const verify = jwt.verify(token, privKey);
  if (verify.iat === false) {
    return false;
  }
  const decoded = jwt.decode(token, { complete: true });
  return decoded;
};
//# sourceMappingURL=token.js.map