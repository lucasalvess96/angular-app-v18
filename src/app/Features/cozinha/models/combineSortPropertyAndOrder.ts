import { SortOrder } from './controlePaginacao';

export const combineSortPropertyAndOrder = (property?: string, order?: SortOrder) => {
  if (property && order && order.length > 0) {
    return `${property},${order}`;
  }

  return property ?? '';
};
