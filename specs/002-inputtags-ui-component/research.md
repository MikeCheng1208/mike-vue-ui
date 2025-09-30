# Research: InputTags UI 元件技術研究

**Feature**: InputTags UI 元件  
**Date**: 2025-09-30  
**Phase**: Phase 0 - 技術研究與決策

## 研究目標

本研究旨在為 InputTags UI 元件的實作提供技術基礎，解決關鍵技術選型問題，並確保實作符合專案標準和最佳實踐。

## 1. Vue 3 Composition API 陣列管理

### 決策: 使用 ref() 管理標籤陣列

**研究發現**:
- `ref()` 適合管理原始類型和陣列，提供 `.value` 存取
- `reactive()` 適合管理物件，但對陣列的解構會失去響應性
- 陣列方法（push, splice, pop）在 ref 包裹下會正確觸發響應式更新

**選擇理由**:
1. **符合使用者需求**: 使用者明確要求「使用 ref 包 Array」
2. **簡潔性**: `tags.value.push()` 直觀且易於理解
3. **響應性保證**: Vue 3 會追蹤 ref 陣列的變化
4. **與現有模式一致**: MPinInput.vue 使用 `const inputValues = ref([])` 的相同模式

**實作模式**:
```javascript
const tags = ref([]);

// 新增標籤
const addTag = (text) => {
  tags.value.push(text);
  emit('update:modelValue', tags.value);
};

// 移除標籤
const removeTag = (index) => {
  const removed = tags.value.splice(index, 1)[0];
  emit('update:modelValue', tags.value);
  emit('remove', removed, index);
};
```

**考慮過的替代方案**:
- ❌ `reactive([])`: 解構會失去響應性，不利於組合式函數使用
- ❌ `ref({})` with object wrapper: 過度複雜，不符合使用者需求

### v-model 雙向綁定實作

**決策**: 使用 modelValue prop 和 update:modelValue emit

**實作模式** (參考 MPinInput.vue):
```javascript
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);

// 監聽 props 變化同步到內部狀態
watch(() => props.modelValue, (newValue) => {
  if (JSON.stringify(newValue) !== JSON.stringify(tags.value)) {
    tags.value = [...newValue];
  }
}, { deep: true });

// 內部變化同步到外部
watch(tags, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });
```

**選擇理由**:
- Vue 3 標準 v-model 模式
- 與 MPinInput.vue 保持一致
- 支援雙向資料流

## 2. 現有元件模式分析 (MPinInput.vue)

### 發現的最佳實踐模式

#### Props 定義模式
```javascript
const props = defineProps({
  length: {
    type: Number,
    default: 5,
    validator: (value) => value > 0 && value <= 10
  },
  disabled: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,  // MInputTags 將使用 Array
    default: ""
  }
});
```

**應用到 MInputTags**:
- 使用相同的結構和命名慣例
- maxTags prop 加入 validator 確保正值
- disabled prop 保持一致

#### Emits 定義模式
```javascript
const emit = defineEmits([
  'update:modelValue',  // v-model
  'complete',           // 完成事件
  'change'              // 變化事件
]);
```

**應用到 MInputTags**:
- `update:modelValue`: v-model 支援
- `add`: 新增標籤事件
- `remove`: 移除標籤事件
- `limit-reached`: 達到上限事件

#### 方法暴露模式
```javascript
defineExpose({
  focus,
  clear,
  getValue,
  setValue
});
```

**應用到 MInputTags**:
- `focus()`: 聚焦輸入框
- `clear()`: 清空所有標籤
- `addTag(text)`: 程式化新增
- `removeTag(index)`: 程式化移除
- `getTags()`: 取得標籤陣列

#### CSS 變數自定義模式
```css
.m-pin-input {
  --pin-input-size: 48px;
  --pin-input-gap: 8px;
  --pin-input-border-color: #d1d5db;
  --pin-input-focus-color: #3b82f6;
  /* ... */
}
```

**應用到 MInputTags**:
```css
.m-input-tags {
  --input-tags-height: 40px;
  --input-tags-gap: 8px;
  --input-tags-border-color: #d1d5db;
  --input-tags-tag-bg: #f3f4f6;
  --input-tags-tag-color: #1f2937;
  --input-tags-tag-max-width: 200px;
  /* ... */
}
```

#### 響應式設計模式
```css
@media (max-width: 640px) {
  .m-pin-input {
    --pin-input-size: 40px;
  }
}
```

**應用到 MInputTags**: 使用相同的斷點和縮放策略

#### 可訪問性模式
```html
<div role="group" :aria-label="`密碼輸入，共 ${length} 位數`">
```

**應用到 MInputTags**: 
```html
<div role="group" aria-label="標籤輸入">
```

## 3. 標籤輸入 UI 模式研究

### Enter 鍵處理

**決策**: 使用 @keydown.enter 監聽並 preventDefault

**實作模式**:
```javascript
const handleKeydown = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // 防止表單提交
    const text = currentInput.value.trim();
    if (text && !isLimitReached.value) {
      addTag(text);
      currentInput.value = '';
    }
  }
};
```

**選擇理由**:
- 符合使用者期望（按 Enter 新增）
- 防止在表單內觸發提交
- 即時清空輸入框準備下次輸入

### 長文字截斷技術

**決策**: 使用 CSS text-overflow: ellipsis

**實作模式**:
```css
.m-input-tags__tag-text {
  max-width: var(--input-tags-tag-max-width, 200px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

**選擇理由**:
- CSS 原生支援，效能好
- 視覺上簡潔清晰
- 可搭配 title 屬性顯示完整內容

**考慮過的替代方案**:
- ❌ JavaScript 字串切割: 無法適應不同字體大小
- ❌ 換行顯示: 違反「截斷並顯示省略號」的澄清決策

### 水平滾動實作

**決策**: 使用 overflow-x: auto 實現單行滾動

**實作模式**:
```css
.m-input-tags__container {
  display: flex;
  align-items: center;
  gap: var(--input-tags-gap);
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scroll-behavior: smooth;
}

/* 隱藏滾動條但保留功能 */
.m-input-tags__container::-webkit-scrollbar {
  height: 4px;
}

.m-input-tags__container::-webkit-scrollbar-thumb {
  background: var(--input-tags-border-color);
  border-radius: 2px;
}
```

**選擇理由**:
- 符合「單行顯示，超出寬度時水平滾動」的澄清決策
- scroll-behavior: smooth 提供流暢體驗
- 自訂滾動條樣式保持美觀

### 標籤移除視覺回饋

**決策**: 使用 CSS transition 提供淡出動畫

**實作模式**:
```css
.m-input-tags__tag {
  transition: all 0.2s ease-out;
}

.m-input-tags__tag--removing {
  opacity: 0;
  transform: scale(0.8);
}
```

```javascript
const removeTag = async (index) => {
  // 添加移除動畫 class
  // 等待動畫完成後再從陣列移除
  await nextTick();
  tags.value.splice(index, 1);
};
```

**選擇理由**:
- 提供視覺反饋提升 UX
- 動畫時間短（0.2s）不影響效能
- 與 MPinInput 的動畫策略一致

## 4. 可訪問性考量

### ARIA 標籤

**決策**: 使用適當的 ARIA 屬性增強可訪問性

**實作模式**:
```html
<div 
  class="m-input-tags" 
  role="group" 
  aria-label="標籤輸入"
>
  <div 
    v-for="(tag, index) in tags" 
    :key="index"
    role="listitem"
    :aria-label="`標籤: ${tag}`"
  >
    <span class="m-input-tags__tag-text">{{ tag }}</span>
    <button
      type="button"
      :aria-label="`移除標籤 ${tag}`"
      @click="removeTag(index)"
    >
      ×
    </button>
  </div>
  
  <input
    type="text"
    :placeholder="placeholder"
    :aria-label="placeholder"
    :disabled="disabled || isLimitReached"
  />
</div>
```

**選擇理由**:
- role="group" 表明這是一組相關元素
- role="listitem" 表明標籤是列表項
- aria-label 提供螢幕閱讀器描述
- 按鈕有明確的 aria-label 說明功能

### 鍵盤操作支援

**決策**: 支援基本鍵盤操作

**實作功能**:
- ✅ Enter: 新增標籤
- ✅ Tab: 焦點在輸入框和移除按鈕間切換
- ⚠️ Backspace: 根據澄清決策，輸入框為空時不刪除標籤

**選擇理由**:
- 符合規格中的澄清決策
- 保持鍵盤操作的一致性
- Tab 操作由瀏覽器原生支援

### 色彩對比

**決策**: 確保符合 WCAG AA 標準（4.5:1 對比度）

**實作考量**:
```css
.m-input-tags {
  --input-tags-tag-bg: #f3f4f6;      /* 淺灰背景 */
  --input-tags-tag-color: #1f2937;   /* 深灰文字 */
  --input-tags-border-color: #d1d5db; /* 中灰邊框 */
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .m-input-tags {
    --input-tags-tag-bg: #374151;
    --input-tags-tag-color: #f9fafb;
  }
}
```

**選擇理由**:
- 預設顏色符合對比度要求
- 支援深色模式自動切換
- 與 MPinInput 的顏色系統一致

## 5. 輸入驗證與邊界處理

### 空白字符驗證

**決策**: 使用 trim() 驗證，拒絕純空白輸入

**實作模式**:
```javascript
const addTag = (text) => {
  const trimmed = text.trim();
  
  // 驗證: 不能為空
  if (!trimmed) {
    return;
  }
  
  // 驗證: 不能超過數量限制
  if (props.maxTags && tags.value.length >= props.maxTags) {
    emit('limit-reached');
    return;
  }
  
  // 驗證: 不能超過長度限制
  if (trimmed.length > props.maxTagLength) {
    // 可選: 截斷或拒絕
    return;
  }
  
  tags.value.push(trimmed);
  emit('add', trimmed);
  emit('update:modelValue', tags.value);
};
```

**選擇理由**:
- 符合規格 FR-008: 「系統必須忽略僅包含空白字符的輸入」
- 多層驗證確保資料品質
- 發射事件提供外部處理機會

### 數量限制處理

**決策**: 達到上限時禁用輸入並觸發事件

**實作模式**:
```javascript
const isLimitReached = computed(() => {
  return props.maxTags !== null && tags.value.length >= props.maxTags;
});

// 模板中
<input
  :disabled="disabled || isLimitReached"
  :placeholder="isLimitReached ? '已達標籤數量上限' : placeholder"
/>
```

**選擇理由**:
- 視覺上明確（輸入框禁用）
- 使用者無法繼續輸入
- placeholder 提供即時反饋

## 6. 效能考量

### 大量標籤處理

**決策**: 支援至少 100 個標籤，使用虛擬化考慮 1000+ 標籤

**當前實作** (100 個標籤):
- 使用原生 v-for 渲染
- 水平滾動容器
- CSS contain 優化

**未來擴展** (如需支援 1000+ 標籤):
- 考慮使用 @vueuse/core 的 useVirtualList
- 僅渲染可見區域的標籤

**當前選擇理由**:
- 100 個標籤在現代瀏覽器效能良好
- 簡單實作，易於維護
- 符合 constitution 的簡潔原則

### 響應式更新優化

**決策**: 使用 computed 和 watch 最小化重新渲染

**實作模式**:
```javascript
// 使用 computed 避免每次渲染重新計算
const isLimitReached = computed(() => {
  return props.maxTags !== null && tags.value.length >= props.maxTags;
});

// 使用 watch 而非 watchEffect 明確依賴
watch(tags, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });
```

**選擇理由**:
- computed 有緩存機制
- watch 只在特定變化時觸發
- 減少不必要的更新

## 總結與決策記錄

### 核心技術決策

| 項目 | 決策 | 理由 |
|------|------|------|
| 陣列管理 | ref([]) | 符合使用者需求，與 MPinInput 一致 |
| v-model | modelValue prop + update:modelValue emit | Vue 3 標準模式 |
| 長文字處理 | CSS text-overflow: ellipsis | 效能好，符合澄清決策 |
| 排列方式 | flex + overflow-x: auto | 符合澄清決策（單行滾動） |
| 數量限制 | 可配置 maxTags prop | 符合澄清決策（可配置上限） |
| 重複標籤 | 允許重複 | 符合澄清決策 |
| Backspace | 輸入框為空時不做動作 | 符合澄清決策 |
| 樣式系統 | CSS 變數 + scoped style | 與 MPinInput 保持一致 |
| 可訪問性 | ARIA 標籤 + 鍵盤支援 | 遵循最佳實踐 |

### 未解決事項（將在 Phase 1 決定）

1. **標籤資料結構**: 使用 `string[]` 或 `Array<{ text: string, id: number }>`
   - 建議: `string[]` - 更簡潔，符合使用者「push 到 Array」的描述
   
2. **移除按鈕圖示**: 使用 × 文字或 SVG 圖示
   - 建議: × 文字 - 簡單有效，與 MPinInput 風格一致

3. **標籤順序**: 新標籤顯示在最前或最後
   - 建議: 最後 - 符合 push 操作的直覺

4. **tooltip 顯示**: hover 截斷標籤時是否顯示完整文字
   - 建議: 使用 title 屬性 - 原生支援，無需額外程式碼

### 風險與緩解措施

| 風險 | 影響 | 緩解措施 |
|------|------|----------|
| 大量標籤效能問題 | 中 | 當前支援 100 個，文檔說明限制，未來可擴展虛擬化 |
| 不同瀏覽器滾動條樣式不一致 | 低 | 使用標準 CSS，提供 CSS 變數自定義 |
| 長標籤名稱截斷後可讀性差 | 低 | 使用 title 屬性顯示完整內容 |

### 參考資料

1. **Vue 3 官方文檔**
   - Composition API: https://vuejs.org/api/composition-api-setup.html
   - Reactivity API: https://vuejs.org/api/reactivity-core.html

2. **專案現有程式碼**
   - MPinInput.vue: 組件結構和模式參考
   - package.json: 依賴版本確認

3. **最佳實踐**
   - Vue 3 Composition API 最佳實踐
   - Web Accessibility Initiative (WAI) ARIA 標準

---

**Phase 0 Status**: ✅ 完成  
**Next Phase**: Phase 1 - Design & Contracts
