# CcThu

> [!WARNING]
> 🚧🚧 WIP now! 🚧🚧

<div align="center">

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/chillcicada/CcThu/ci.yml) ![wakatime](https://wakatime.com/badge/user/018b2987-2ecc-45d3-9469-0a8572bb2e32/project/91a7b714-6008-4492-922d-1612f32c1635.svg) ![GitHub License](https://img.shields.io/github/license/chillcicada/CcThu)

</div>

## Introduction

CcThu is an API server based on [Bun](https://bun.sh) and [Elysia](https://elysiajs.com) that helps users build their own [THU](https://www.tsinghua.edu.cn) API server quickly.

## Features

We have currently implemented event-driven module lazy loading, and combined with the performance of Bun and Elysia, we are able to maintain resource usage under 100 MB in scenarios with hundreds of thousands of requests per second (local tests show around 75 MB, which is more than sufficient in fact). This makes it highly suitable for deployment on personal edge computing devices. In principle, it can handle the normal requests of all the teachers, students, and staff in a school, but we still recommend private deployment and do not advocate for or provide public interfaces.

<details>

<summary>Unsupported Websites / Interfaces</summary>

> [!WARNING]
> We won't provide any support for interfaces that are prone to be easily abused.

e.g.:

- lib.tsinghua.edu.cn / 图书馆阅读相关接口
- ...

If you privately implement relevant interfaces and cause abuse and are punished, you are responsible for the consequences and we have nothing to do with the responsibility. The right of interpretation belongs to us.

</details>

## Usage

> [!WARNING]
> The project is still under development, so there is no release yet. And it is not recommended to use it now.

## Documentation

In coming.

## Deployment

In coming.

<!-- > [!IMPORTANT]
> 我们不建议您采用 Fork 的方式公开部署本项目，因为这样可能容易泄露您的个人信息。在未来我们会考虑为加入认证机制来提供安全性，但我们仍然优先推荐私有部署（原因在于一些自动化服务可能需要长期存储您的信息，但我们也很提供必要的加密保证），具体方法见下。

- docker

> 如果您想要参与开发或是个性化您的 API 服务（如何使用 API 服务不算此类），根据协议，我们希望您能够 Fork 本项目或以其他形式开源您的修改，但请注意不要使您的个人信息泄露。 -->

## Development

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Insight

<div align="center">

![CcThu](https://repobeats.axiom.co/api/embed/7b84f1d5737a1499abd6010db0735512d3ab6c7c.svg)

</div>

<!-- ## Afterwords

> [!IMPORTANT]
> The content has nothing to do with the project, and it includes some personal feelings (such as complaints) of the author.
> As it's not recommended, and you can ignore it.

If you want to see, at [here](https://chillcicada.com/articles/endpapers_1#about-ccthu). -->

## FAQ

<details>

<summary>Some questions you may have.</summary>

- Q: How does this API server work?

  A: Use cookies and to simulate login, and then use the request to get the data, and finally parse the data on server and return it to the user. We manually maintain the cookie mechanisms.

- Q: What is the frequency of updates/commits?

  A: Every Friday evening (UTC+8). Exculding some special cases.

- Q: What's the development plan?

  A: I'm currently working for the releasing of version 0.1.0. Learn more at [here](https://github.com/chillcicada/CcThu/issues/1). For I'm very busy 😎, I may only focus on key parts of the development before v0.1.0. It's due to released in the August and September of this year.

<!-- - Q: 这是否会造成恶性竞争的情况？

  A: 这个问题我在 [Afterwords](#afterwords) 里面也有提及，首先我是出于解决自身需求而决定开发这个项目的，其次，本项目的逻辑均是解析公开的界面内容，并以更精简的方式回复，此外，一些类似的项目也在被使用着，比如 [Thu-Info-Lib](https://www.npmjs.com/package/@thu-info/lib) 和 [Thu-Learn-Lib](https://www.npmjs.com/package/@thu-info/lib) 延伸的 [Learn-Helper](https://github.com/Harry-Chen/Learn-Helper) 和 [Thu-Info](https://github.com/thu-info-community/thu-info-app) 等，就目前的情况来看，这些项目并没有造成恶性竞争的情况。同时，出于更妥善的想法，本项目也以 GPL-3.0 协议开源，希望能够帮助到更多的人，可以使用 `license-checker` 来查看所有依赖包的证书。

- Q: 本项目是否会采取一些推广的手段，比如与官方合作，或是其他方式？

  A: 本项目的初衷是为了解决自身需求，所以并没有考虑过推广的问题，客观上讲，我并不反对推广，但同时我希望任何行为（包括推广）都不能泄露开发者的个人隐私等权益，否则我可能会因此要求拒绝推广，同时，在这一点的考量上，我可能不会参与官方的合作。至于有多少人会用到这个项目，我认为这与我开发这个项目的想法无关，我也不关心会被多少人使用。 -->

</details>

## Acknowledgment

- [Visual Studio Code](https://code.visualstudio.com)
- [Bun](https://bun.sh)
- [Elysia](https://elysiajs.com)
- [Thu-Learn-Lib](https://github.com/Harry-Chen/THU-Learn-Lib)
- [Thu-Info-Lib](https://www.npmjs.com/package/@thu-info/lib)
- ......

## License

[GPL-3.0-only](https://www.gnu.org/licenses/gpl-3.0.html)

> Hint: almost all devDependencies' licenses are GPLv3 compatible except the [argparse@2.0.1](https://github.com/nodeca/argparse), which is released under [Python-2.0](https://opensource.org/license/Python-2.0) license. [The Python-2.0 license is incompatible with GPL](https://www.gnu.org/licenses/license-list.en.html#PythonOld), [which is marked as no longer live and is set a short identifier as PSF-2.0 by spdx](https://spdx.org/licenses/PSF-2.0.html). But it must be noted that the `Python-2.0` and `PSF-2.0` are actually different licenses, and [the PSF-2.0 is compatible with GPL](https://www.gnu.org/licenses/license-list.en.html#Python). **What's more, judging by the [argparse@2.0.1's license](https://github.com/nodeca/argparse/blob/master/LICENSE) contents, it's actually released under PSF-2.0 license instead of Python-2.0 license.** But in [the page of spdx](https://spdx.org/licenses), the Python-2.0 is marked as `FSF Free/Libre` and `OSI Approved` while the PSF-2.0 (or Python-2.0.1) isn't. The relative discussions can be seen at [#162](https://github.com/nodeca/argparse/issues/162), [#170](https://github.com/nodeca/argparse/pull/170) and [#173](https://github.com/nodeca/argparse/pull/173). This is confused, and i consider the argparse@2.0.1 is released under `PSF-2.0` according to its license file, which means there is no incompatible devDependencies with GPLv3 in fact, and if you have any issues about this, please [let me know](https://github.com/chillcicada/CcThu/issues/new).
