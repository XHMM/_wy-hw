## 项目分析

### 背景
人们每天都有很多事情需要处理，若能使用一款软件来协助管理，这样可以极大提升办事效率。

### 目标
- 让用户不再将所有事情记到脑子里，解放大脑，让大脑产出率更高。  
- 极简的功能设计让使用者摆脱“设置纠结症”。

### 竞品分析
|名称| 是否免费可用| 是否有收费解锁新功能 (鸡肋) | 是否全平台支持|
|---|---|---|---| 
|[todolist](https://todoist.com/)| 是| 有| 是 |
|[microsoft todo](https://todo.microsoft.com/tasks/)| 是| 无| 是|
|[高效todo](http://www.gxtodo.com/)| 是| 有 | 否| 是 |

(注：全平台指Win、Mac、Android、IOS、Web)

#### todolist  
- 优：功能十分完整，提供了很多其他应用平台的聚合能力，在团队协作方面功能表现强大，里面的karma功能在用户完成todo后会积攒经验值，游戏化的方式来促进效率提升。
- 缺：该应用的免费版仅能使用到很基础的功能，付费版才是一个真正强大的TODO软件。不支持子任务功能。对国内安卓用户不太友好，国内主流安卓应用商店很难搜到其app，须使用google play。

#### microsoft todo 
- 优：功能十分完整，支持子任务，完全免费，界面设计十分清新，对个人或是小团体使用者相当合适。
- 缺：没有标签功能，在国内使用过程中网络有时不太稳定。

#### 高效todo 
- 优：采用四象限模式显示待办项，在时间优先级的表达上效果显著；含有项目功能，可以给每个项目创建待办项。
- 缺：界面虽然简洁明了，但整体来看样式风格还是偏旧，有提升空间。里面的地点功能对待办类软件作用不是很大。此外由于待办软件可能会在各自场景下使用到，不支持PC端也是一个较大的不足。

#### 本项目
在功能丰富度上与上述竞品相比明显不行，仅提供了TODO的增改删，但因为这单一的功能和轻简直观的界面，十分适合轻度场景下的使用，如短时间内的琐事记录，并且由于操作简单，任何年龄段人群都可迅速上手使用，且无需对待办项进行二次设置，随用随开，用完即关。

### 架构
该项目采用前后端分离的开发方式。前端在设计体验上以material风格为准，具体以react进行实现，使用自建的webpack模板进行开发环境的管理，在样式处理上统一采用css-in-js的方式。nginx负责静态资源服务和接口转发处理。后台使用nodejs搭建http服务器，在orm上选用了mongoose的变体@typegoose，其是对mongoose的封装，旨在提供更好的typescript开发体验。代码规范上使用了自封装的eslint插件确保规范和统一。选用docker托管服务，消除开发环境和部署环境的差异性。

![arch](./images/p-arch.jpg)

![data](./images/p-data-flow.jpg)


### 里程碑 (有误)
![milestone](./images/p-milestone.jpg)

## 用户手册
### 背景
我们都有过这样的日子：有无数的事情要做，却不知道如何去完成。我们很容易被每天必须做的大量任务压垮。有时我们有太多的事情要做以至于我们思绪变得混乱，忘记做一些重要的事情。该应用让你把脑子里的事情拿出来，让它来帮你管理，这样你的大脑就不会再被这些东西占据空间，高效地完成当前的事情吧。
### 目的
该TODO应用将帮你规整你的事宜，你可以随时添加，标记完成或是删除。页面清晰简洁，无任何广告植入，简单好用。
### 使用说明
这是一款基于网页端的应用，首先你需要在电脑或手机上安装一款浏览器软件，然后访问我们的网站进入应用。该应用具有极简的外观设计，在页面上方的输入框内输入你的待办事宜，回车键确定或是点击右侧的图标进行确定(图标会在输入内容后显示)即可新建：

![u1](./images/u1.png)

点击对号按钮将标记该TODO为完成状态，点击垃圾箱按钮将删除该TODO(注意：这些操作是不可撤销的)
点击输入框下方的“已完成”进行列表切换，此时将显示所有已完成的TODO项，每个TODO可以通过垃圾箱按钮进行删除

![u2](./images/u2.png)

所有数据将会在云端进行保存，你可随时打开页面进行TODO的查看和更新。希望这一轻简的小应用能让梳理好待办事宜，帮你提升办事工作效率。

## 项目目录结构
```txt
project
│ 
├── client #前端
│   ├── build
│   ├── src
│   │   ├── components #存放共享组件
│   │   │   ├── Todo.test.tsx #测试文件和对应组件放于同一目录
│   │   │   ├── Todo.tsx
│   │   │   ├── TodoInput.test.tsx
│   │   │   ├── TodoInput.tsx
│   │   │   ├── Todos.test.tsx
│   │   │   └── Todos.tsx
│   │   ├── pages #页面文件
│   │   │   └── index
│   │   │       └── Index.tsx
│   │   ├── App.tsx
│   │   ├── global.d.ts
│   │   ├── index.html
│   │   ├── index.tsx #打包入口文件
│   │   ├── modules.d.ts
│   │   └── requests.ts #http请求
│   ├── __mocks__
│   │   ├── fileMock.ts
│   │   └── styleMock.ts
│   ├── babel.config.json
│   ├── Dockerfile
│   ├── jest.config.js
│   ├── package.json
│   ├── prettier.config.js
│   ├── tsconfig.json
│   ├── webpack.config.js
│   └── webpack.dll.js
│ 
├── server #后端
│   ├── src
│   │   ├── controllers #存放存储层对业务层的接口暴露
│   │   │   └── todos.ts
│   │   ├── models #存放数据模型的定义
│   │   │   └── todo.ts
│   │   ├── routers #存放对接口层的请求处理
│   │   │   ├── helpers.ts
│   │   │   └── todos.ts
│   │   ├── App.ts #http server的初始化文件
│   │   ├── Db.ts #数据库的初始化文件
│   │   └── index.ts #项目入口文件
│   ├── Dockerfile
│   ├── install.sh
│   ├── package.json
│   ├── prettier.config.js
│   └── tsconfig.json
│ 
├── base.yml
├── dev.yml
├── prod.yml
└── README.md
```

## 开发部署
运行该项目前请确保本地可正常使用 `docker-compose` 命令：
### 本地开发
- 在根目录下运行 `docker-compose -f base.yml -f dev.yml up -d`
- 访问 `http://localhost:8081`
### 线上部署
- 在根目录下运行 `docker-compose -f base.yml -f prod.yml up -d`
- 访问 `http://domain.com`
