# PJBLOG-PLUGIN-TAGS

标签云，提供PJBlog的文章使用最多的标签的集合，多用于博客侧边展示。提供后台变量控制来动态展示数据个数。

## API

```ts
const result = axios.get('/api/plugin/pjblog-plugin-tags/tags');
return res.data as {
  id: number,
  name: string,
  count: number,
}[]
```

## Theme

**service.ts**

```ts
export async function getTags(configs: AxiosRequestConfig) {
  const res = await request.get('/api/plugin/pjblog-plugin-tags/tags', configs);
  return res.data;
}
```

**component**

```tsx
export default function Component() {
  const configs = useRequestConfigs();
  const { data } = useAsync('tags', () => getTags(configs));
  return <ul>
    {
      data.map(res => {
        return <li key={res.id}>{res.name}({res.count})</li>
      })
    }
  </ul>
}
```