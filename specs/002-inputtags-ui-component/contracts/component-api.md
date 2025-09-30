# Component API Contract: MInputTags

**Feature**: InputTags UI 元件  
**Date**: 2025-09-30  
**Component**: MInputTags.vue

## 概述

本文檔定義 MInputTags 元件的完整 API 合約，包括 Props、Events、Slots 和暴露方法。此合約作為元件實作和使用的標準規範。

## Props

### modelValue
- **類型**: `Array<string>`
- **必填**: 否
- **預設值**: `[]`
- **描述**: v-model 綁定的標籤陣列，每個元素是一個字串代表標籤文字
- **驗證**: 必須是字串陣列
- **範例**:
  ```javascript
  const tags = ref(['Vue', 'React', 'Angular']);
  ```

### disabled
- **類型**: `Boolean`
- **必填**: 否
- **預設值**: `false`
- **描述**: 是否禁用元件，禁用時無法新增或移除標籤
- **範例**:
  ```vue
  <MInputTags v-model="tags" :disabled="true" />
  ```

### maxTags
- **類型**: `Number | null`
- **必填**: 否
- **預設值**: `null`
- **描述**: 標籤數量上限，`null` 表示無限制
- **驗證**: 必須為 null 或大於 0 的整數
- **範例**:
  ```vue
  <MInputTags v-model="tags" :max-tags="10" />
  ```

### maxTagLength
- **類型**: `Number`
- **必填**: 否
- **預設值**: `150`
- **描述**: 單個標籤文字的最大字符數，超過則不允許新增
- **驗證**: 必須大於 0
- **範例**:
  ```vue
  <MInputTags v-model="tags" :max-tag-length="50" />
  ```

### placeholder
- **類型**: `String`
- **必填**: 否
- **預設值**: `'輸入後按 Enter 新增標籤'`
- **描述**: 輸入框的占位文字
- **範例**:
  ```vue
  <MInputTags v-model="tags" placeholder="輸入關鍵字..." />
  ```

## Events

### update:modelValue
- **參數**: `(tags: string[]) => void`
- **觸發時機**: 標籤陣列變化時（新增或移除標籤）
- **描述**: v-model 雙向綁定事件，用於同步標籤陣列到父元件
- **範例**:
  ```vue
  <MInputTags 
    :model-value="tags" 
    @update:model-value="tags = $event" 
  />
  ```

### add
- **參數**: `(tag: string) => void`
- **觸發時機**: 成功新增標籤後
- **描述**: 提供新增的標籤文字
- **範例**:
  ```vue
  <MInputTags 
    v-model="tags"
    @add="handleAdd"
  />
  
  <script setup>
  const handleAdd = (tag) => {
    console.log('新增標籤:', tag);
  };
  </script>
  ```

### remove
- **參數**: `(tag: string, index: number) => void`
- **觸發時機**: 移除標籤後
- **描述**: 提供被移除的標籤文字和原始索引
- **範例**:
  ```vue
  <MInputTags 
    v-model="tags"
    @remove="handleRemove"
  />
  
  <script setup>
  const handleRemove = (tag, index) => {
    console.log(`移除標籤 "${tag}" (索引: ${index})`);
  };
  </script>
  ```

### limit-reached
- **參數**: `() => void`
- **觸發時機**: 使用者嘗試新增標籤但已達到 `maxTags` 上限時
- **描述**: 通知父元件已達到標籤數量上限
- **範例**:
  ```vue
  <MInputTags 
    v-model="tags"
    :max-tags="5"
    @limit-reached="handleLimitReached"
  />
  
  <script setup>
  const handleLimitReached = () => {
    alert('已達到標籤數量上限！');
  };
  </script>
  ```

## Exposed Methods

### focus()
- **參數**: 無
- **回傳**: `void`
- **描述**: 聚焦到輸入框
- **使用情境**: 需要程式化控制焦點時
- **範例**:
  ```vue
  <script setup>
  import { ref } from 'vue';
  
  const inputTagsRef = ref(null);
  
  const focusInput = () => {
    inputTagsRef.value.focus();
  };
  </script>
  
  <template>
    <MInputTags ref="inputTagsRef" v-model="tags" />
    <button @click="focusInput">聚焦輸入框</button>
  </template>
  ```

### clear()
- **參數**: 無
- **回傳**: `void`
- **描述**: 清空所有標籤
- **副作用**: 會觸發 `update:modelValue` 事件
- **範例**:
  ```vue
  <script setup>
  import { ref } from 'vue';
  
  const inputTagsRef = ref(null);
  
  const clearAll = () => {
    inputTagsRef.value.clear();
  };
  </script>
  
  <template>
    <MInputTags ref="inputTagsRef" v-model="tags" />
    <button @click="clearAll">清空標籤</button>
  </template>
  ```

### addTag(text: string)
- **參數**: 
  - `text`: 要新增的標籤文字
- **回傳**: `void`
- **描述**: 程式化新增標籤
- **驗證**: 會執行與手動輸入相同的驗證（空白檢查、長度限制、數量限制）
- **副作用**: 成功時會觸發 `add` 和 `update:modelValue` 事件
- **範例**:
  ```vue
  <script setup>
  import { ref } from 'vue';
  
  const inputTagsRef = ref(null);
  
  const addPresetTag = () => {
    inputTagsRef.value.addTag('Vue 3');
  };
  </script>
  
  <template>
    <MInputTags ref="inputTagsRef" v-model="tags" />
    <button @click="addPresetTag">新增 Vue 3 標籤</button>
  </template>
  ```

### removeTag(index: number)
- **參數**: 
  - `index`: 要移除的標籤索引（從 0 開始）
- **回傳**: `void`
- **描述**: 程式化移除指定索引的標籤
- **驗證**: 索引必須在有效範圍內（0 ~ tags.length - 1）
- **副作用**: 成功時會觸發 `remove` 和 `update:modelValue` 事件
- **範例**:
  ```vue
  <script setup>
  import { ref } from 'vue';
  
  const inputTagsRef = ref(null);
  
  const removeFirstTag = () => {
    inputTagsRef.value.removeTag(0);
  };
  </script>
  
  <template>
    <MInputTags ref="inputTagsRef" v-model="tags" />
    <button @click="removeFirstTag">移除第一個標籤</button>
  </template>
  ```

### getTags()
- **參數**: 無
- **回傳**: `string[]`
- **描述**: 取得所有標籤的陣列副本
- **注意**: 回傳的是陣列副本，修改不會影響元件內部狀態
- **範例**:
  ```vue
  <script setup>
  import { ref } from 'vue';
  
  const inputTagsRef = ref(null);
  
  const exportTags = () => {
    const allTags = inputTagsRef.value.getTags();
    console.log('所有標籤:', allTags);
    navigator.clipboard.writeText(allTags.join(', '));
  };
  </script>
  
  <template>
    <MInputTags ref="inputTagsRef" v-model="tags" />
    <button @click="exportTags">匯出標籤</button>
  </template>
  ```

## Slots

### 無 Slots
本元件目前不提供 slots，所有 UI 由元件內部控制以確保一致性。

**未來可能的 Slots**（參考用，不在當前實作範圍）:
- `tag`: 自定義標籤內容渲染
- `remove-icon`: 自定義移除按鈕圖示

## CSS 變數（自定義樣式）

元件支援透過 CSS 變數自定義外觀：

```css
.m-input-tags {
  /* 容器 */
  --input-tags-height: 40px;
  --input-tags-padding: 8px;
  --input-tags-gap: 8px;
  --input-tags-border-color: #d1d5db;
  --input-tags-border-width: 1px;
  --input-tags-border-radius: 6px;
  --input-tags-bg-color: #ffffff;
  --input-tags-focus-color: #3b82f6;
  --input-tags-focus-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  
  /* 標籤 */
  --input-tags-tag-bg: #f3f4f6;
  --input-tags-tag-color: #1f2937;
  --input-tags-tag-padding: 4px 8px;
  --input-tags-tag-border-radius: 4px;
  --input-tags-tag-font-size: 14px;
  --input-tags-tag-max-width: 200px;
  
  /* 移除按鈕 */
  --input-tags-remove-size: 16px;
  --input-tags-remove-color: #6b7280;
  --input-tags-remove-hover-color: #ef4444;
  
  /* 輸入框 */
  --input-tags-input-font-size: 14px;
  --input-tags-input-color: #1f2937;
  --input-tags-input-placeholder-color: #9ca3af;
  
  /* 禁用狀態 */
  --input-tags-disabled-bg: #f9fafb;
  --input-tags-disabled-color: #9ca3af;
}
```

### 使用範例

```vue
<template>
  <MInputTags 
    v-model="tags" 
    class="custom-input-tags"
  />
</template>

<style>
.custom-input-tags {
  --input-tags-tag-bg: #dbeafe;
  --input-tags-tag-color: #1e40af;
  --input-tags-focus-color: #3b82f6;
}
</style>
```

## 完整使用範例

### 基本使用
```vue
<script setup>
import { ref } from 'vue';
import { MInputTags } from 'mike-vue-ui';

const tags = ref(['Vue', 'React']);
</script>

<template>
  <MInputTags v-model="tags" />
</template>
```

**注意**: 使用時需先引入樣式：
```javascript
import 'mike-vue-ui/dist/index.css';
```

### 進階使用
```vue
<script setup>
import { ref } from 'vue';
import { MInputTags } from 'mike-vue-ui';

const tags = ref([]);
const inputTagsRef = ref(null);

const handleAdd = (tag) => {
  console.log('新增:', tag);
};

const handleRemove = (tag, index) => {
  console.log('移除:', tag, '索引:', index);
};

const handleLimitReached = () => {
  alert('已達到 5 個標籤的上限！');
};

const addPresetTags = () => {
  inputTagsRef.value.addTag('JavaScript');
  inputTagsRef.value.addTag('TypeScript');
};

const clearAll = () => {
  inputTagsRef.value.clear();
};
</script>

<template>
  <div>
    <MInputTags 
      ref="inputTagsRef"
      v-model="tags"
      :max-tags="5"
      :max-tag-length="20"
      placeholder="輸入技術標籤..."
      :disabled="false"
      @add="handleAdd"
      @remove="handleRemove"
      @limit-reached="handleLimitReached"
    />
    
    <div class="buttons">
      <button @click="addPresetTags">新增預設標籤</button>
      <button @click="clearAll">清空所有</button>
    </div>
    
    <div class="info">
      標籤數量: {{ tags.length }}
      <br>
      標籤列表: {{ tags.join(', ') }}
    </div>
  </div>
</template>
```

## 測試情境（文檔形式）

根據 constitution 規定不需要實際測試程式碼，以下為預期行為描述：

### 1. v-model 綁定
- **情境**: 父元件更新 v-model 值
- **預期**: 元件內部標籤同步更新
- **情境**: 元件內部新增/移除標籤
- **預期**: 父元件的 v-model 值同步更新

### 2. 新增標籤
- **情境**: 輸入文字後按 Enter
- **預期**: 標籤新增到陣列，輸入框清空，觸發 add 事件
- **情境**: 輸入空白字串後按 Enter
- **預期**: 不新增標籤，無事件觸發
- **情境**: 達到 maxTags 上限後嘗試新增
- **預期**: 不新增標籤，觸發 limit-reached 事件

### 3. 移除標籤
- **情境**: 點擊標籤的 X 按鈕
- **預期**: 標籤從陣列移除，觸發 remove 事件

### 4. 禁用狀態
- **情境**: disabled = true
- **預期**: 輸入框禁用，無法新增或移除標籤

### 5. 程式化操作
- **情境**: 呼叫 addTag() 方法
- **預期**: 與手動輸入相同的行為和驗證
- **情境**: 呼叫 removeTag() 方法
- **預期**: 移除指定索引的標籤
- **情境**: 呼叫 clear() 方法
- **預期**: 清空所有標籤

## 相容性

### Vue 版本
- **最低要求**: Vue 3.3.0+
- **推薦版本**: Vue 3.3.4+

### 瀏覽器支援
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 響應式支援
- 桌面: ✅ 完整支援
- 平板: ✅ 完整支援（樣式調整）
- 手機: ✅ 完整支援（樣式調整）

## 變更歷史

### v0.1.0 (2025-09-30)
- 初始 API 設計
- 定義 Props、Events、Exposed Methods
- 定義 CSS 變數

---

**Contract Status**: ✅ 完成  
**Last Updated**: 2025-09-30
