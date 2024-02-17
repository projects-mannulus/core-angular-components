/**
 * Function que obtiene el valor de un objeto a partir de una key soportando ".".
 * example:
 * object = {
 *  a: {
 *      b: {
 *          c: 'valor de c'
 *        }
 *      }
 * }
 * key = 'a.b.c'
 * cascadeKey(object, key) => 'valor de c'
 * @param object
 * @param key
 * @returns
 */
export function cascadeKey(object: any, key: any): any {
  let value = object;
  if (key.split('.').length === 0) {
    return object[key];
  }
  try {
    key.split('.').forEach((element: any) => {
      value = value[element];
    });
  } catch (error) {
    console.error('Error al obtener el valor de la key: ' + key, error);
    value = error;
  }
  return value;
}
