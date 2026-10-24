import { PageRequest } from '../../../shared/models/page-request.model';

export interface PersonQuery extends PageRequest {
  name: string;
}
