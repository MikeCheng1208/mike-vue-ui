# 研究報告: PinInput 組件

**日期**: 2025-09-17  
**功能**: PinInput 密碼輸入組件  
**狀態**: 完成

## 技術決策

### Vue3 Composition API 與 Setup Script
- **決策**: 使用 Vue3 Composition API 搭配 `<script setup>` 語法糖
- **理由**: 
  - 提供更好的 TypeScript 支援（雖然不使用 TS，但語法更簡潔）
  - 減少樣板代碼，更直觀的組合式邏輯
  - 更好的樹搖優化和性能
  - 符合 Vue3 最佳實踐
- **考慮的替代方案**: 
  - Options API: 較舊的方式，不符合現代最佳實踐
  - Composition API 無 setup 語法糖: 需要更多樣板代碼

### SFC 結構順序
- **決策**: `<script setup>` > `<template>` > `<style scoped>`
- **理由**: 
  - 符合使用者指定的順序要求
  - 邏輯優先，便於開發者快速了解組件行為
  - Vue 官方推薦的現代結構
- **考慮的替代方案**: 
  - template 優先: 不符合使用者要求
  - 其他順序組合: 不符合最佳實踐

### 焦點管理策略
- **決策**: 使用 Vue refs 和原生 DOM focus() API
- **理由**: 
  - 直接且可靠的焦點控制
  - 不需要額外依賴
  - 與 Vue 響應式系統完美整合
- **考慮的替代方案**: 
  - 第三方焦點管理庫: 增加不必要的複雜性
  - 純 CSS 解決方案: 無法滿足複雜的邏輯需求

### 鍵盤事件處理
- **決策**: 監聽 `keydown` 和 `input` 事件組合
- **理由**: 
  - `keydown` 用於刪除邏輯和特殊鍵處理
  - `input` 用於字符輸入和自動跳轉
  - 提供最精確的控制
- **考慮的替代方案**: 
  - 只使用 `input` 事件: 無法處理刪除邏輯
  - 只使用 `keydown` 事件: 字符輸入處理複雜

### 輸入驗證
- **決策**: 使用正則表達式 `/^\d$/` 驗證單一數字
- **理由**: 
  - 簡單且高效
  - 明確限制為數字字符
  - 易於維護和擴展
- **考慮的替代方案**: 
  - `isNaN()` 檢查: 可能接受非預期格式
  - 字符碼檢查: 代碼可讀性較差

### 狀態管理
- **決策**: 使用 `ref` 和 `reactive` 管理組件狀態
- **理由**: 
  - Vue3 響應式系統的最佳實踐
  - 自動追蹤依賴和更新
  - 與模板系統無縫整合
- **考慮的替代方案**: 
  - 傳統變數: 失去響應式特性
  - Pinia/Vuex: 對單一組件過度設計

### CSS 樣式方法
- **決策**: 使用 scoped CSS 搭配 CSS 變數
- **理由**: 
  - 避免樣式污染
  - 提供自定義主題能力
  - 符合現有庫的樣式方法
- **考慮的替代方案**: 
  - CSS-in-JS: 不符合專案約束
  - 全域 CSS: 可能造成樣式衝突

## 實作模式

### 組件 Props 設計
```javascript
// 建議的 props 結構
const props = defineProps({
  length: { type: Number, default: 5 },
  disabled: { type: Boolean, default: false },
  modelValue: { type: String, default: '' }
})
```

### 事件發射設計
```javascript
// 建議的事件結構
const emit = defineEmits(['update:modelValue', 'complete'])
```

### Ref 管理模式
```javascript
// 動態 ref 陣列管理
const inputRefs = ref([])
const setInputRef = (el, index) => {
  inputRefs.value[index] = el
}
```

## 性能考量

### 避免不必要的重新渲染
- 使用 `v-memo` 指令於適當位置
- 合理使用 `computed` 屬性
- 避免在模板中使用複雜表達式

### 記憶體管理
- 組件卸載時清理事件監聽器
- 避免記憶體洩漏的 ref 引用

## 可訪問性 (A11y)

### ARIA 屬性
- `role="group"` 用於整個組件
- `aria-label` 用於描述用途
- `aria-describedby` 用於錯誤訊息

### 鍵盤導航
- 支援 Tab 鍵在輸入框間移動
- 支援方向鍵左右移動（可選功能）
- 支援 Backspace 和 Delete 鍵的智能行為

## 瀏覽器相容性
- 現代瀏覽器 (Chrome 79+, Firefox 72+, Safari 13+)
- 支援 ES6+ 語法
- 不需要 polyfill（根據專案要求）
