# 7x_blog

# 个人博客项目

## 1. 博客服务端

`如何开启服务`

```bash
> cd ./serve
> npm run start / pnpm run start
```

`如果需要热加载, 则需要全局安装 nodemon`

```bash
> npm install nodemon -g / pnpm install nodemon -g
```

`不需要热加载, 则需要修改package.json文件中的script`

package.json

```json
{
    "scripts": {
        "start": "node ./bin/www"
    }
}
```

## 2. 博客后台管理系统页面

```bash
> cd ./admin
> npm run serve / pnpm run serve
```

打包

```bash
> npm run build / pnpm run build
```

## 3. 博客前端页面

```bash
> cd ./frontend
> npm run serve / pnpm run serve
```

打包

```bash
> npm run build / pnpm run build
```
