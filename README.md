<h1 align="center">Mike Vue UI</h1>

<p align="center">
 mike ui for vue conf workshop.
</p>

<p align="center">
  <a target="_blank" href="https://www.npmjs.com/package/mike-vue-ui">
    <img src="https://img.shields.io/npm/v/mike-vue-ui?color=c95f8b&amp;label=" alt="NPM version">
  </a>
  <a target="_blank" href="https://vuejs.org/" title="vue">
      <img src="https://img.shields.io/badge/vue-%3E%203.0.0-brightgreen.svg">
  </a>
  <a target="_blank" href="http://nodejs.org/download/" title="Node version">
      <img src="https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen.svg">
  </a>
  <a target="_blank" href="https://github.com/MikeCheng1208/vue-metamask/pulls" title="PRs Welcome">
      <img src="https://img.shields.io/badge/PRs-welcome-blue.svg">
  </a>
</p>

<p align="center">
<a target="_blank" href="https://www.npmjs.com/package/mike-vue-ui">
  <img src="https://nodei.co/npm-dl/mike-vue-ui.png?months=6" alt="NPM version">
</a>
</p>


<p align="center">
<a>English</a> | <a>中文</a>
</p>


### Installation
```
npm install mike-vue-ui -S
```

## Components
1. email input
  - 專門給 email 的 input，提供下拉選項使用

<img src="./assets/email-input.gif" />
<br/>

```javascript
import { MEmailInput } from "mike-vue-ui";

const message = ref("");

const options = {
  // 非必要
  suffix: ["@gmail.com", "@hotmail.com", "@yahoo.com"],
};
```

```html
  <m-email-input v-model="message" :options="options"></m-email-input>
```

<br/>

2. 簡易的 table

<img src="./assets/table.png" />
<br/>

```javascript
  const columns = ref([
    { 
      id: 0, label: 'Product Number', field: 'serial', 
      style: { width: '12%', color: 'red' } 
    },
    { 
      id: 1, label: 'Product Name', field: 'product', 
      style: { width: '12%', color: 'coral' } 
    },
    { 
      id: 2, label: 'Price', field: 'sellingPrice', 
      style: { width: '12%', color: 'green' } 
    },
    { 
      id: 3, label: 'Narrative', field: 'discount', 
      style: { width: '57%', color: 'blue' } 
    },
    { 
      id: 5, label: 'Other', field: 'other', 
      style: { width: '7%', color: 'blueviolet' } 
    },
  ]);

  const rows = ref([
    {
      id: 0,
      serial: 'TAPX4689',
      product: 'apple',
      sellingPrice: 'TWD 20',
      discount: '美國好吃大蘋果',
      other: 'other',
    },
    {
      id: 0,
      serial: 'TAPX4689',
      product: 'pineapple',
      sellingPrice: 'TWD 50',
      discount: '住在深海的大鳳梨',
      other: 'other',
    },
    {
      id: 1,
      serial: 'TAPX4689',
      product: 'tangerinr',
      sellingPrice: 'TWD 70',
      discount: '朱志清的橘子',
      other: 'other',
    },
    {
      id: 2,
      serial: 'TAPX4689',
      product: 'pear',
      sellingPrice: 'TWD 20',
      discount: '好吃多汁的水梨',
      other: 'other',
    },
    {
      id: 3,
      serial: 'TAPX4689',
      product: 'cherry',
      sellingPrice: 'TWD 30',
      discount: '加州紅櫻桃',
      other: 'other',
    },
    {
      id: 4,
      serial: 'TAPX4689',
      product: 'banana',
      sellingPrice: 'TWD 40',
      discount: '猴子吃香蕉',
      other: 'other',
    },
  ]);
```

```html
  <vue-pure-table :columns="columns" :rows="rows"></vue-pure-table>
```


## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [MikeCheng1208](https://github.com/MikeCheng1208)
