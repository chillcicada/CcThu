# CONTRIBUTING

> [!IMPORTANT]
> CcThu is an API server based on [Bun](https://bun.sh), with [Elysia](https://elysiajs.com) as the backfront framework and [Typescipt](https://www.typescriptlang.org) as programming language.

- You should have basic knowledge of web API, and it's better for you to have some knowledge of RESTful API.
- You should have basic ability to read and write Typescript code, and you should have some experience in using Node.js and Async programming.
- Your committed code should pass the typecheck, ESlint and other CI pipeline, and you should have a basic understanding of how to use [Git](https://git-scm.com).

## Pre-Knowledge

We can devide the THU's urls into three types:

- use the uniform auth to login via any network, such as `learn.tsinghua.edu.cn`, `info.tsinghua.edu.cn`, etc.
- use the uniform auth to login via the campus network or webvpn, such as `lib.tsinghua.edu.cn`, etc.
- use the single auth to login (usually via any network), such as `dsa.cs.tsinghua.edu.cn/oj`, etc.

<!-- ## Design Philosophy

对于不常更新的公共数据，我们采取直接在服务器上缓存的方式，并定期自动更新。 -->

## How to Contribute

### Commit A New API Module / Router

example:

```ts
// src/module/v1/example.ts
// ...

// This is used for lazy loading
export default async function exampleModule(/** */): Promise<BaseResponse<T>> {
  // ...
}

export { exampleModule } // This is used for other modules to import

// ...
```

## Script Standard

> Hint: ESlint will help you to check and fix the code style. But you should have a basic knowledge of this project's code style.
