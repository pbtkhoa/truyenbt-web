type Type = { [key: string]: string }

export default function removeNamespace<T extends Type>(
  namespace: string,
  types: Type
): T {
  return Object.keys(types).reduce((result: Type, key: string) => {
    result[key] = types[key].replace(namespace, '')
    return result
  }, {}) as T
}
