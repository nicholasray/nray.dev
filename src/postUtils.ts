/**
 * Returns a new object that only includes keys from `keys` arg. If `undefined`,
 * the key will not be included in the object.
 */
export const pick = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]) => {
  return keys.reduce((newObj, key) => {
    if (key in obj) {
      newObj[key] = obj[key];
    }
    return newObj;
  }, {} as Pick<Obj, typeof keys[number]>);
}
