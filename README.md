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


## 🚀 Features

- 🎪 **Support for Vue 3** 
- 🦾 **Simple and user-friendly UI components**
- 🔋 **Develop the integration of UnoCSS (optional)**
- 🔩 **Compatible with cjs, es, and iife versions**
- 🌎 **Documentation available：** [中文](./zh-tw/README.md) | English


### 📦 Installation
```
npm install mike-vue-ui -S
```


### 🕶 Style
```javascript
import 'mike-vue-ui/dist/index.css';
```

## ⚡ Components

<details>
  <summary>1. Email Input</summary>

  ## email input
  - Specialized input for emails, providing a dropdown selection.

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
</details>

<br/>

<details>
<summary>2. Pin Input</summary>

## Pin Input
- 密碼輸入組件，支援自定義長度、智能焦點管理和刪除行為
- 適用於 PIN 碼、驗證碼等固定位數輸入場景

```javascript
import { MPinInput } from "mike-vue-ui";

const pinValue = ref("");

// 完成輸入時的回調
const onComplete = (value) => {
  console.log('輸入完成:', value);
};

// 單個框改變時的回調
const onChange = (value, index) => {
  console.log(`第 ${index + 1} 個框改變:`, value);
};
```

```html
<!-- 基本使用（預設 5 位數） -->
<m-pin-input v-model="pinValue" @complete="onComplete" @change="onChange"></m-pin-input>

<!-- 自定義長度 -->
<m-pin-input v-model="pinValue" :length="4"></m-pin-input>

<!-- 禁用狀態 -->
<m-pin-input v-model="pinValue" :disabled="true"></m-pin-input>
```

### 程式化控制
```javascript
// 獲取組件引用
const pinInputRef = ref(null);

// 設定值
pinInputRef.value.setValue('1234');

// 清空所有
pinInputRef.value.clear();

// 設定焦點到指定位置
pinInputRef.value.focus(2); // 第3個框

// 獲取當前值
const currentValue = pinInputRef.value.getValue();
```

### 特色功能
- ✅ **智能焦點管理**: 輸入時自動跳轉，刪除時智能回跳
- ✅ **輸入驗證**: 只接受數字字符
- ✅ **可訪問性支援**: ARIA 屬性、鍵盤導航
- ✅ **自定義主題**: CSS 變數支援
- ✅ **響應式設計**: 支援行動裝置
- ✅ **程式化控制**: 完整的 API 方法

</details>

<br/>

<details>
<summary>3. Simple table.</summary>
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
<m-pure-table :columns="columns" :rows="rows">
  <template #product="{data}">
    <h3>😏 {{ data.rowData }}</h3>
  </template>
</m-pure-table>
```
</details>



## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [MikeCheng1208](https://github.com/MikeCheng1208)
