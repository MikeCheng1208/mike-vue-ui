# Data Model: InputTags UI 元件

**Feature**: InputTags UI 元件  
**Date**: 2025-09-30  
**Phase**: Phase 1 - 資料模型設計

## 概述

本文檔定義 MInputTags 元件的資料結構、狀態管理和資料流。根據使用者需求「針對 Array 去做新增，顯示的 UI 內容會 push 到 Array 裡面，使用 ref 包 Array」，我們採用簡單直接的字串陣列模型。

## 核心資料結構

### 1. Tags Array（標籤陣列）

**類型定義**:
```javascript
// 使用 ref 包裹的字串陣列
const tags = ref<string[]>([]);
```

**說明**:
- 每個元素是一個字串，代表一個標籤的文字內容
- 使用 `ref()` 包裹確保響應性
- 新增標籤使用 `tags.value.push(text)`
- 移除標籤使用 `tags.value.splice(index, 1)`

**範例**:
```javascript
// 空陣列（初始狀態）
tags.value = []

// 包含三個標籤
tags.value = ['JavaScript', 'Vue 3', 'UnoCSS']

// 新增標籤
tags.value.push('Vite')  // ['JavaScript', 'Vue 3', 'UnoCSS', 'Vite']

// 移除索引 1 的標籤
tags.value.splice(1, 1)  // ['JavaScript', 'UnoCSS', 'Vite']
```

**選擇理由**:
- ✅ 符合使用者需求（ref 包 Array）
- ✅ 簡單直觀，易於理解和維護
- ✅ 符合 v-model 綁定模式（Array 類型）
- ✅ 不需要額外的 ID 管理（使用索引作為 key）

**考慮過的替代方案**:
```javascript
// ❌ 方案 A: 帶 ID 的物件陣列
const tags = ref([
  { id: 1, text: 'JavaScript' },
  { id: 2, text: 'Vue 3' }
]);
// 缺點: 增加複雜度，需要 ID 生成邏輯，不符合「簡單 push」的需求

// ❌ 方案 B: 使用 Set
const tags = ref(new Set(['JavaScript', 'Vue 3']));
// 缺點: Set 不支援索引存取，不利於 v-for 渲染和移除操作
```

### 2. Current Input（當前輸入）

**類型定義**:
```javascript
const currentInput = ref<string>('');
```

**說明**:
- 綁定到 input 元素的 v-model
- 使用者輸入的暫存文字
- 按下 Enter 後會被處理並清空

**生命週期**:
```
1. 使用者輸入文字 → currentInput.value 更新
2. 按下 Enter → 驗證並新增到 tags
3. 清空 → currentInput.value = ''
```

### 3. Component Props（元件屬性）

**類型定義**:
```javascript
interface Props {
  modelValue: string[];      // v-model 綁定的標籤陣列
  disabled?: boolean;        // 是否禁用元件
  maxTags?: number | null;   // 標籤數量上限（null 表示無限制）
  maxTagLength?: number;     // 單個標籤最大字符數
  placeholder?: string;      // 輸入框占位文字
}
```

**預設值**:
```javascript
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  maxTags: {
    type: Number,
    default: null,
    validator: (value) => value === null || value > 0
  },
  maxTagLength: {
    type: Number,
    default: 150,
    validator: (value) => value > 0
  },
  placeholder: {
    type: String,
    default: '輸入後按 Enter 新增標籤'
  }
});
```

### 4. Computed State（計算狀態）

**類型定義**:
```javascript
// 是否達到標籤數量上限
const isLimitReached = computed<boolean>(() => {
  return props.maxTags !== null && tags.value.length >= props.maxTags;
});

// 是否可以新增標籤
const canAddTag = computed<boolean>(() => {
  return !props.disabled && !isLimitReached.value;
});

// 當前標籤數量
const tagCount = computed<number>(() => {
  return tags.value.length;
});
```

## 資料流

### 1. 初始化流程

```
1. 元件掛載
   ↓
2. 從 props.modelValue 讀取初始值
   ↓
3. 初始化 tags.value = [...props.modelValue]
   ↓
4. 渲染標籤列表
```

**實作**:
```javascript
// 初始化時同步外部值到內部狀態
const tags = ref([...props.modelValue]);

// 監聽外部變化
watch(() => props.modelValue, (newValue) => {
  // 避免循環更新：僅當外部值與內部值不同時才更新
  if (JSON.stringify(newValue) !== JSON.stringify(tags.value)) {
    tags.value = [...newValue];
  }
}, { deep: true });
```

### 2. 新增標籤流程

```
1. 使用者輸入文字 → currentInput.value
   ↓
2. 按下 Enter 鍵
   ↓
3. 驗證輸入
   ├─ 是否為空（trim 後）？
   ├─ 是否達到數量上限？
   └─ 是否超過長度限制？
   ↓
4. 通過驗證 → tags.value.push(text)
   ↓
5. 觸發事件
   ├─ emit('add', text)
   └─ emit('update:modelValue', tags.value)
   ↓
6. 清空輸入 → currentInput.value = ''
```

**實作**:
```javascript
const addTag = (text) => {
  // 步驟 3: 驗證
  const trimmed = text.trim();
  
  if (!trimmed) {
    return; // 空白輸入，不處理
  }
  
  if (isLimitReached.value) {
    emit('limit-reached');
    return; // 達到上限
  }
  
  if (trimmed.length > props.maxTagLength) {
    return; // 超過長度限制
  }
  
  // 步驟 4: 新增到陣列
  tags.value.push(trimmed);
  
  // 步驟 5: 觸發事件
  emit('add', trimmed);
  emit('update:modelValue', tags.value);
  
  // 步驟 6: 清空輸入
  currentInput.value = '';
};

// Enter 鍵處理
const handleKeydown = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTag(currentInput.value);
  }
};
```

### 3. 移除標籤流程

```
1. 使用者點擊標籤的 X 按鈕
   ↓
2. 傳入標籤索引
   ↓
3. 取得要移除的標籤文字
   ↓
4. 從陣列移除 → tags.value.splice(index, 1)
   ↓
5. 觸發事件
   ├─ emit('remove', tag, index)
   └─ emit('update:modelValue', tags.value)
```

**實作**:
```javascript
const removeTag = (index) => {
  // 步驟 3: 取得標籤
  const tag = tags.value[index];
  
  // 步驟 4: 從陣列移除
  tags.value.splice(index, 1);
  
  // 步驟 5: 觸發事件
  emit('remove', tag, index);
  emit('update:modelValue', tags.value);
};
```

### 4. v-model 雙向綁定流程

```
父元件更新
   ↓
props.modelValue 變化
   ↓
watch 監聽到變化
   ↓
更新內部 tags.value
   ↓
觸發重新渲染

內部操作（add/remove）
   ↓
tags.value 變化
   ↓
watch 監聽到變化
   ↓
emit('update:modelValue', tags.value)
   ↓
父元件接收更新
```

**實作**:
```javascript
// 外部 → 內部
watch(() => props.modelValue, (newValue) => {
  if (JSON.stringify(newValue) !== JSON.stringify(tags.value)) {
    tags.value = [...newValue];
  }
}, { deep: true });

// 內部 → 外部
watch(tags, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });
```

## 狀態轉換圖

### 標籤狀態
```
[不存在]
   ↓ (addTag)
[存在] ─→ 在 tags 陣列中
   ↓ (removeTag)
[不存在]
```

### 輸入框狀態
```
[可用]
   ↓ (disabled = true 或達到上限)
[禁用]
   ↓ (disabled = false 且未達上限)
[可用]
```

### 元件整體狀態
```
[空白狀態]
├─ tags.length = 0
├─ 顯示 placeholder
└─ 可接受輸入
   ↓ (新增標籤)
[有標籤狀態]
├─ tags.length > 0
├─ 顯示標籤列表
└─ 可繼續輸入（未達上限）
   ↓ (達到上限)
[已滿狀態]
├─ tags.length = maxTags
├─ 輸入框禁用
└─ 顯示「已達上限」提示
   ↓ (移除標籤)
[有標籤狀態]
```

## 資料驗證規則

### 1. 新增標籤驗證

| 規則 | 檢查條件 | 錯誤處理 |
|------|----------|----------|
| 非空驗證 | `text.trim() !== ''` | 靜默失敗，不新增 |
| 長度驗證 | `text.length <= maxTagLength` | 靜默失敗，不新增 |
| 數量限制 | `tags.length < maxTags` | 觸發 `limit-reached` 事件 |
| 禁用狀態 | `!disabled` | 輸入框本身已禁用 |

### 2. Props 驗證

```javascript
// maxTags 驗證
validator: (value) => value === null || (typeof value === 'number' && value > 0)

// maxTagLength 驗證
validator: (value) => typeof value === 'number' && value > 0 && value <= 1000

// modelValue 驗證
validator: (value) => Array.isArray(value) && value.every(item => typeof item === 'string')
```

## 邊界情況處理

### 1. 空標籤處理
```javascript
// 問題: 使用者輸入空格或 tab
const text = '   ';

// 解決: 使用 trim() 過濾
const trimmed = text.trim(); // ''
if (!trimmed) return; // 不新增
```

### 2. 重複標籤處理
```javascript
// 根據澄清決策: 允許重複
tags.value = ['Vue', 'React'];
addTag('Vue'); // 允許
tags.value = ['Vue', 'React', 'Vue']; // 結果
```

### 3. 數量上限處理
```javascript
// 情境: maxTags = 3, 已有 3 個標籤
if (tags.value.length >= props.maxTags) {
  emit('limit-reached');
  return; // 不允許新增
}
```

### 4. 長標籤處理
```javascript
// 情境: maxTagLength = 150, 輸入 200 字
if (text.length > props.maxTagLength) {
  // 選項 A: 拒絕新增
  return;
  
  // 選項 B: 自動截斷（未採用）
  // text = text.substring(0, props.maxTagLength);
}
```

### 5. 同步衝突處理
```javascript
// 問題: 外部和內部同時更新可能造成循環
// 解決: 在 watch 中比較值，避免不必要的更新
watch(() => props.modelValue, (newValue) => {
  if (JSON.stringify(newValue) !== JSON.stringify(tags.value)) {
    tags.value = [...newValue];
  }
}, { deep: true });
```

## 效能考量

### 1. 響應式更新
```javascript
// ✅ 推薦: 使用 splice, push 等會觸發響應的方法
tags.value.push('新標籤');    // 觸發更新
tags.value.splice(0, 1);      // 觸發更新

// ❌ 避免: 直接賦值給索引（Vue 3 可以但不推薦）
tags.value[0] = '新值';       // 可行但不建議
```

### 2. 深度監聽
```javascript
// watch 使用 deep: true 監聽陣列變化
watch(tags, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true }); // 注意效能影響

// 如果陣列很大，考慮使用 watchEffect
watchEffect(() => {
  emit('update:modelValue', tags.value);
});
```

### 3. 大量標籤
```javascript
// 當前設計支援 ~100 個標籤
// 如需支援更多，考慮:
// 1. 虛擬滾動（@vueuse/core useVirtualList）
// 2. 分頁顯示
// 3. 懶加載
```

## 程式化 API

### 暴露的方法

```javascript
// 使用 defineExpose 暴露方法給父元件
defineExpose({
  // 聚焦輸入框
  focus: () => {
    inputRef.value?.focus();
  },
  
  // 清空所有標籤
  clear: () => {
    tags.value = [];
    emit('update:modelValue', []);
  },
  
  // 程式化新增標籤
  addTag: (text) => {
    addTag(text);
  },
  
  // 程式化移除標籤
  removeTag: (index) => {
    if (index >= 0 && index < tags.value.length) {
      removeTag(index);
    }
  },
  
  // 取得所有標籤
  getTags: () => {
    return [...tags.value];
  }
});
```

### 使用範例

```vue
<script setup>
import { ref } from 'vue';
import MInputTags from './MInputTags.vue';

const tags = ref(['Vue', 'React']);
const inputTagsRef = ref(null);

// 程式化操作
const handleSomeAction = () => {
  inputTagsRef.value.addTag('Angular');    // 新增標籤
  inputTagsRef.value.removeTag(0);         // 移除第一個
  inputTagsRef.value.focus();              // 聚焦
  console.log(inputTagsRef.value.getTags()); // 取得所有標籤
};
</script>

<template>
  <MInputTags ref="inputTagsRef" v-model="tags" />
</template>
```

## 資料持久化

### 本地儲存（可選）

```javascript
// 如果需要在頁面重新整理後保留標籤
import { useLocalStorage } from '@vueuse/core';

// 使用 @vueuse/core 的 useLocalStorage
const tags = useLocalStorage('input-tags', []);

// 或手動實作
watch(tags, (newValue) => {
  localStorage.setItem('tags', JSON.stringify(newValue));
}, { deep: true });

// 初始化時載入
onMounted(() => {
  const saved = localStorage.getItem('tags');
  if (saved) {
    tags.value = JSON.parse(saved);
  }
});
```

**注意**: 本功能不在核心需求中，僅作為擴展參考。

## 總結

### 核心資料結構
- ✅ 使用 `ref<string[]>` 管理標籤陣列
- ✅ 簡單直觀的字串陣列模型
- ✅ 符合使用者「ref 包 Array + push」的需求

### 關鍵設計決策
- 使用索引作為 v-for 的 key（標籤不需要唯一 ID）
- 使用 trim() 驗證防止空白標籤
- 使用 computed 計算派生狀態
- 使用 watch 實現 v-model 雙向綁定
- 使用 defineExpose 提供程式化 API

### 與規格的對應

| 規格需求 | 資料模型實作 |
|----------|-------------|
| FR-001: 文字輸入框 | currentInput ref |
| FR-002: Enter 新增標籤 | addTag 方法 + push 操作 |
| FR-006: 點擊 X 移除 | removeTag 方法 + splice 操作 |
| FR-008: 忽略空白 | trim() 驗證 |
| FR-009: 取得標籤列表 | getTags() 方法 |
| FR-010: 程式化操作 | defineExpose API |
| FR-012: 初始值 | props.modelValue + watch |
| FR-014: 允許重複 | 無唯一性檢查 |
| FR-016: 可配置上限 | maxTags prop + isLimitReached computed |

---

**Phase 1 Data Model Status**: ✅ 完成  
**Next**: Phase 1 - Contracts & Quickstart
