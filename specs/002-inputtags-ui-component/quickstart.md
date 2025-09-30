# Quick Start: MInputTags 元件

**Feature**: InputTags UI 元件  
**Date**: 2025-09-30  
**Target**: 開發者快速上手指南

## 安裝

### 從 npm 安裝（發布後）
```bash
npm install mike-vue-ui
```

### 本地開發
```bash
# Clone 專案
git clone https://github.com/MikeCheng1208/mike-vue-ui.git
cd mike-vue-ui

# 安裝依賴
npm install

# 開發模式
npm run dev
```

## 基本使用

### 1. 匯入元件

```vue
<script setup>
import { ref } from 'vue';
import { MInputTags } from 'mike-vue-ui';

const tags = ref([]);
</script>

<template>
  <MInputTags v-model="tags" />
</template>
```

**注意**: 元件會從建置後的檔案 (`dist/mike-vue-ui.es.js`) 匯入，確保樣式也正確載入：
```javascript
import 'mike-vue-ui/dist/index.css';
```

### 2. 設定初始值

```vue
<script setup>
import { ref } from 'vue';
import { MInputTags } from 'mike-vue-ui';

// 使用 ref 包裹陣列
const tags = ref(['Vue', 'React', 'Angular']);
</script>

<template>
  <MInputTags v-model="tags" />
  
  <div>
    目前標籤: {{ tags.join(', ') }}
  </div>
</template>
```

### 3. 監聽標籤變化

```vue
<script setup>
import { ref, watch } from 'vue';
import { MInputTags } from 'mike-vue-ui';

const tags = ref([]);

// 方法 1: 使用 watch
watch(tags, (newTags) => {
  console.log('標籤已更新:', newTags);
});

// 方法 2: 使用事件
const handleAdd = (tag) => {
  console.log('新增標籤:', tag);
};

const handleRemove = (tag, index) => {
  console.log(`移除標籤 "${tag}" (索引: ${index})`);
};
</script>

<template>
  <MInputTags 
    v-model="tags"
    @add="handleAdd"
    @remove="handleRemove"
  />
</template>
```

## 常見使用情境

### 情境 1: 限制標籤數量

```vue
<script setup>
import { ref } from 'vue';
import { MInputTags } from 'mike-vue-ui';

const tags = ref([]);

const handleLimitReached = () => {
  alert('最多只能新增 5 個標籤！');
};
</script>

<template>
  <MInputTags 
    v-model="tags"
    :max-tags="5"
    @limit-reached="handleLimitReached"
  />
  
  <p>已使用: {{ tags.length }} / 5</p>
</template>
```

### 情境 2: 限制標籤長度

```vue
<script setup>
import { ref } from 'vue';
import { MInputTags } from 'mike-vue-ui';

const tags = ref([]);
</script>

<template>
  <MInputTags 
    v-model="tags"
    :max-tag-length="20"
    placeholder="最多 20 個字"
  />
</template>
```

### 情境 3: 禁用元件

```vue
<script setup>
import { ref } from 'vue';
import { MInputTags } from 'mike-vue-ui';

const tags = ref(['Vue', 'React']);
const isReadOnly = ref(true);
</script>

<template>
  <MInputTags 
    v-model="tags"
    :disabled="isReadOnly"
  />
  
  <button @click="isReadOnly = !isReadOnly">
    {{ isReadOnly ? '啟用編輯' : '禁用編輯' }}
  </button>
</template>
```

### 情境 4: 程式化操作標籤

```vue
<script setup>
import { ref } from 'vue';
import { MInputTags } from 'mike-vue-ui';

const tags = ref([]);
const inputTagsRef = ref(null);

const addPresetTags = () => {
  inputTagsRef.value.addTag('JavaScript');
  inputTagsRef.value.addTag('TypeScript');
  inputTagsRef.value.addTag('Vue 3');
};

const clearAll = () => {
  if (confirm('確定要清空所有標籤？')) {
    inputTagsRef.value.clear();
  }
};

const removeFirst = () => {
  if (tags.value.length > 0) {
    inputTagsRef.value.removeTag(0);
  }
};

const exportTags = () => {
  const allTags = inputTagsRef.value.getTags();
  console.log('匯出標籤:', allTags);
  navigator.clipboard.writeText(allTags.join(', '));
  alert('標籤已複製到剪貼簿！');
};
</script>

<template>
  <MInputTags ref="inputTagsRef" v-model="tags" />
  
  <div class="button-group">
    <button @click="addPresetTags">新增預設標籤</button>
    <button @click="clearAll">清空所有</button>
    <button @click="removeFirst">移除第一個</button>
    <button @click="exportTags">匯出標籤</button>
  </div>
</template>

<style scoped>
.button-group {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}

button {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  background: white;
  cursor: pointer;
}

button:hover {
  background: #f3f4f6;
}
</style>
```

### 情境 5: 表單整合

```vue
<script setup>
import { ref } from 'vue';
import { MInputTags } from 'mike-vue-ui';

const formData = ref({
  title: '',
  tags: [],
  description: ''
});

const submitForm = () => {
  console.log('提交表單:', formData.value);
  
  // 驗證標籤
  if (formData.value.tags.length === 0) {
    alert('請至少新增一個標籤！');
    return;
  }
  
  // 提交到後端
  // fetch('/api/articles', {
  //   method: 'POST',
  //   body: JSON.stringify(formData.value)
  // });
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label>標題</label>
      <input v-model="formData.title" type="text" required />
    </div>
    
    <div class="form-group">
      <label>標籤</label>
      <MInputTags 
        v-model="formData.tags"
        :max-tags="10"
        placeholder="輸入標籤後按 Enter"
      />
    </div>
    
    <div class="form-group">
      <label>描述</label>
      <textarea v-model="formData.description" rows="4"></textarea>
    </div>
    
    <button type="submit">提交</button>
  </form>
</template>

<style scoped>
.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}
</style>
```

## 自定義樣式

### 基本自定義

```vue
<template>
  <MInputTags 
    v-model="tags" 
    class="custom-tags"
  />
</template>

<style>
.custom-tags {
  /* 容器樣式 */
  --input-tags-border-color: #3b82f6;
  --input-tags-focus-color: #2563eb;
  --input-tags-bg-color: #f0f9ff;
  
  /* 標籤樣式 */
  --input-tags-tag-bg: #dbeafe;
  --input-tags-tag-color: #1e40af;
  --input-tags-tag-font-size: 16px;
  
  /* 移除按鈕 */
  --input-tags-remove-hover-color: #dc2626;
}
</style>
```

### 進階自定義（深色主題）

```vue
<template>
  <MInputTags 
    v-model="tags" 
    class="dark-theme"
  />
</template>

<style>
.dark-theme {
  --input-tags-border-color: #374151;
  --input-tags-bg-color: #1f2937;
  --input-tags-focus-color: #3b82f6;
  
  --input-tags-tag-bg: #374151;
  --input-tags-tag-color: #f9fafb;
  
  --input-tags-input-color: #f9fafb;
  --input-tags-input-placeholder-color: #9ca3af;
  
  --input-tags-remove-color: #9ca3af;
  --input-tags-remove-hover-color: #ef4444;
}
</style>
```

## 完整範例

### 部落格文章標籤編輯器

```vue
<script setup>
import { ref, computed } from 'vue';
import { MInputTags } from 'mike-vue-ui';

const tags = ref(['Vue', 'JavaScript']);
const inputTagsRef = ref(null);

// 預設標籤建議
const suggestions = ['Vue', 'React', 'Angular', 'TypeScript', 'JavaScript', 'CSS', 'HTML'];

// 過濾掉已選擇的標籤
const availableSuggestions = computed(() => {
  return suggestions.filter(s => !tags.value.includes(s));
});

const addSuggestion = (tag) => {
  inputTagsRef.value.addTag(tag);
};

const handleLimitReached = () => {
  alert('最多只能選擇 5 個標籤！');
};
</script>

<template>
  <div class="tag-editor">
    <h3>選擇標籤</h3>
    
    <MInputTags 
      ref="inputTagsRef"
      v-model="tags"
      :max-tags="5"
      :max-tag-length="20"
      placeholder="輸入自定義標籤..."
      @limit-reached="handleLimitReached"
    />
    
    <div class="suggestions" v-if="availableSuggestions.length > 0">
      <p>建議標籤:</p>
      <div class="suggestion-list">
        <button 
          v-for="tag in availableSuggestions" 
          :key="tag"
          @click="addSuggestion(tag)"
          :disabled="tags.length >= 5"
        >
          + {{ tag }}
        </button>
      </div>
    </div>
    
    <div class="info">
      <p>已選擇 {{ tags.length }} / 5 個標籤</p>
      <p v-if="tags.length > 0">
        標籤預覽: 
        <code>{{ tags.join(', ') }}</code>
      </p>
    </div>
  </div>
</template>

<style scoped>
.tag-editor {
  max-width: 600px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

h3 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #1f2937;
}

.suggestions {
  margin-top: 16px;
}

.suggestions p {
  margin-bottom: 8px;
  font-size: 14px;
  color: #6b7280;
}

.suggestion-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.suggestion-list button {
  padding: 6px 12px;
  border: 1px dashed #d1d5db;
  border-radius: 4px;
  background: white;
  color: #6b7280;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.suggestion-list button:hover:not(:disabled) {
  border-color: #3b82f6;
  color: #3b82f6;
  background: #eff6ff;
}

.suggestion-list button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.info {
  margin-top: 16px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 4px;
  font-size: 14px;
}

.info p {
  margin: 4px 0;
}

code {
  padding: 2px 6px;
  background: #e5e7eb;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
}
</style>
```

## 驗證清單

在完成實作後，請確認以下功能：

### 基本功能
- [ ] 可以透過 v-model 綁定標籤陣列
- [ ] 輸入文字後按 Enter 可以新增標籤
- [ ] 點擊標籤的 X 按鈕可以移除標籤
- [ ] 輸入空白字串不會新增標籤
- [ ] 新增/移除標籤會觸發對應事件

### Props 功能
- [ ] disabled prop 可以禁用元件
- [ ] maxTags prop 可以限制標籤數量
- [ ] maxTagLength prop 可以限制標籤長度
- [ ] placeholder prop 可以自定義占位文字

### 程式化 API
- [ ] focus() 方法可以聚焦輸入框
- [ ] clear() 方法可以清空所有標籤
- [ ] addTag() 方法可以程式化新增標籤
- [ ] removeTag() 方法可以程式化移除標籤
- [ ] getTags() 方法可以取得標籤陣列

### UI/UX
- [ ] 標籤以單行方式顯示
- [ ] 超出寬度時支援水平滾動
- [ ] 長標籤會被截斷並顯示省略號
- [ ] 達到上限時輸入框禁用
- [ ] 移除標籤有流暢的動畫效果

### 樣式自定義
- [ ] 可以透過 CSS 變數自定義顏色
- [ ] 支援響應式設計（手機/平板/桌面）
- [ ] 支援深色模式
- [ ] 支援高對比度模式

### 可訪問性
- [ ] 元件有適當的 ARIA 標籤
- [ ] 支援鍵盤操作（Enter 新增、Tab 切換焦點）
- [ ] 移除按鈕有清晰的 aria-label
- [ ] 顏色對比符合 WCAG AA 標準

### 效能
- [ ] 支援至少 100 個標籤無性能問題
- [ ] v-model 雙向綁定正常運作
- [ ] 無記憶體洩漏

## 疑難排解

### Q: 為什麼 v-model 沒有同步更新？
**A**: 確保綁定的變數使用 `ref()` 或 `reactive()` 包裹：
```javascript
// ✅ 正確
const tags = ref([]);

// ❌ 錯誤
let tags = [];
```

### Q: 如何在按 Enter 時不提交表單？
**A**: 元件內部已處理 `event.preventDefault()`，但如果在表單內使用，建議在表單使用 `@submit.prevent`：
```vue
<form @submit.prevent="handleSubmit">
  <MInputTags v-model="tags" />
</form>
```

### Q: 如何限制只能輸入數字或英文？
**A**: 元件目前不支援內建驗證，建議在 `@add` 事件中自行驗證：
```javascript
const handleAdd = (tag) => {
  if (!/^[a-zA-Z0-9]+$/.test(tag)) {
    inputTagsRef.value.removeTag(tags.value.length - 1);
    alert('只能輸入英文和數字！');
  }
};
```

### Q: 如何實作標籤建議/自動完成？
**A**: 參考上方「部落格文章標籤編輯器」範例，在元件外部實作建議列表。

### Q: 標籤太多時效能變慢怎麼辦？
**A**: 
1. 設定合理的 `maxTags` 限制
2. 如需支援大量標籤（1000+），請開 issue 討論虛擬滾動功能

## 瀏覽器直接使用（HTML）

如果您想在瀏覽器中直接使用元件，請從建置後的檔案匯入：

```html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MInputTags 示例</title>
    <!-- 引入樣式 -->
    <link rel="stylesheet" href="../dist/index.css" />
    <script type="importmap">
      {
        "imports": {
          "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
        }
      }
    </script>
  </head>
  <body>
    <div id="app">
      <h1>標籤輸入示例</h1>
      <m-input-tags v-model="tags"></m-input-tags>
      <p>標籤: {{ tags.join(', ') }}</p>
    </div>

    <script type="module">
      import { createApp, ref } from "vue";
      // 從建置檔案匯入元件
      import { MInputTags } from "../dist/mike-vue-ui.es.js";

      createApp({
        components: { MInputTags },
        setup() {
          const tags = ref(["Vue", "React"]);
          return { tags };
        },
      }).mount("#app");
    </script>
  </body>
</html>
```

**重點提示**:
- ✅ 從 `dist/mike-vue-ui.es.js` 匯入元件（建置後的檔案）
- ✅ 引入 `dist/index.css` 樣式檔
- ❌ 不要直接引入 `.vue` 原始檔（`.vue` 檔案需要建置工具）

完整範例請參考: [example/input-tags.html](../../example/input-tags.html)

## 下一步

- 查看 [完整 API 文檔](./contracts/component-api.md)
- 查看 [資料模型設計](./data-model.md)
- 查看 [技術研究文檔](./research.md)
- 參考 [示例頁面](../../example/input-tags.html)

## 回饋與貢獻

如果您發現問題或有改進建議：
1. 提交 [GitHub Issue](https://github.com/MikeCheng1208/mike-vue-ui/issues)
2. 發送 Pull Request
3. 參與討論

---

**Quick Start Status**: ✅ 完成  
**Last Updated**: 2025-09-30
