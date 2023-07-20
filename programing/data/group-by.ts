export function groupBy(data: any, key: string): any {
  return data.reduce((res: any, item: any) => {
    const groupName = item[key] || '_';
    const group = res[groupName] || [];
    group.push(item);
    res[groupName] = group;
    return res;
  }, {})
}

export function deepGroupBy(data: any, ...keys: string[]): any {
  if (keys.length === 0) return data;
  const [key, ...restKeys] = keys;
  const tree = groupBy(data, key);
  Object.keys(tree).forEach(key => {
    if (key === '_') return;
    tree[key] = deepGroupBy(tree[key], ...restKeys);
  });
  return tree;
}