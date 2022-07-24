import { Schema } from 'joi';

interface UseMiddleware {
  schema?: Schema;
  header?: string;
  token?: boolean;
}

export default UseMiddleware;
