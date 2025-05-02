export const convertPropertyTypesToPrimitives = (object: any) =>
  objectMap(object, (property: any) => {
    if (property instanceof Date) {
      return new Date(property).toLocaleDateString('pt-BR');
    }

    return property;
  });

export const objectMap = (obj: any, fn: any) => fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

const fromEntries = <T>(entries: [keyof T, T[keyof T]][]): T =>
  entries.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as T);
