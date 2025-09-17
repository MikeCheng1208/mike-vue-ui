# PinInput 組件 API 合約

**版本**: v1.0.0  
**日期**: 2025-09-17  
**狀態**: 草案

## 組件簽名

### 基本使用
```vue
<MPinInput 
  v-model="pinValue" 
  :length="5" 
  :disabled="false"
  @complete="onComplete"
  @change="onChange"
/>
```

## Props 合約

### 必要 Props
無必要 props，所有 props 都有預設值。

### 可選 Props

#### `length`
- **類型**: `Number`
- **預設值**: `5`
- **描述**: 輸入框的數量
- **驗證**: 
  - 必須是正整數
  - 範圍: 1-10（實用限制）
- **範例**: `:length="4"` 顯示 4 個輸入框

#### `disabled`
- **類型**: `Boolean`
- **預設值**: `false`
- **描述**: 是否禁用整個組件
- **範例**: `:disabled="true"` 禁用所有輸入框

#### `modelValue` (v-model)
- **類型**: `String`
- **預設值**: `''`
- **描述**: 綁定的值，用於雙向資料綁定
- **驗證**: 
  - 只能包含數字字符
  - 長度不超過 length 屬性
- **範例**: `v-model="userPin"`

## Events 合約

### `update:modelValue`
- **觸發時機**: 任何輸入框的值改變時
- **參數**: 
  - `value: string` - 完整的輸入值
- **範例**: 輸入 "123" 時發射 `update:modelValue("123")`

### `complete`
- **觸發時機**: 所有輸入框都有值時
- **參數**:
  - `value: string` - 完整的輸入值
- **範例**: 5位數全部輸入完成時發射 `complete("12345")`

### `change`
- **觸發時機**: 單個輸入框值改變時
- **參數**:
  - `value: string` - 完整的輸入值
  - `index: number` - 改變的輸入框索引
- **範例**: 第2個框輸入 "3" 時發射 `change("1234", 1)`

## Methods 合約 (Expose)

### `focus(index?: number)`
- **描述**: 設定焦點到指定的輸入框
- **參數**:
  - `index?: number` - 輸入框索引（可選，預設為下一個空框）
- **回傳**: `void`
- **範例**: `pinInputRef.value.focus(2)` 焦點移到第3個框

### `clear()`
- **描述**: 清空所有輸入框
- **參數**: 無
- **回傳**: `void`
- **副作用**: 觸發 `update:modelValue('')` 事件
- **範例**: `pinInputRef.value.clear()`

### `getValue()`
- **描述**: 獲取當前完整值
- **參數**: 無
- **回傳**: `string` - 完整的輸入值
- **範例**: `const value = pinInputRef.value.getValue()` 

### `setValue(value: string)`
- **描述**: 程式化設定值
- **參數**:
  - `value: string` - 要設定的值
- **回傳**: `void`
- **驗證**: 只接受數字字符，超長部分會被截斷
- **副作用**: 觸發 `update:modelValue` 和可能的 `complete` 事件
- **範例**: `pinInputRef.value.setValue("1234")`

## 行為合約

### 輸入行為
1. **數字輸入**: 接受 0-9 數字字符
2. **自動跳轉**: 輸入後自動移動到下一個框
3. **非數字拒絕**: 非數字字符被忽略
4. **覆蓋輸入**: 有值的框被新輸入覆蓋

### 刪除行為
1. **當前框有值**: 清空當前框，焦點保持
2. **當前框無值**: 跳到前一框並清空其值
3. **第一框刪除**: 當第一框無值時，刪除鍵無效果

### 焦點行為
1. **Tab 導航**: 支援 Tab 鍵在框間移動
2. **點擊焦點**: 點擊任意框設定焦點
3. **邊界處理**: 最後一框輸入後焦點保持，第一框刪除後焦點保持

### 禁用狀態
1. **整體禁用**: disabled=true 時所有交互被禁用
2. **視覺反饋**: 禁用狀態有明確的視覺指示
3. **事件阻止**: 禁用時不觸發任何事件

## 樣式合約

### CSS 類別
- `.m-pin-input` - 根容器
- `.m-pin-input__item` - 單個輸入框
- `.m-pin-input__item--focused` - 焦點狀態
- `.m-pin-input__item--disabled` - 禁用狀態
- `.m-pin-input__item--filled` - 有值狀態

### CSS 變數
- `--pin-input-size` - 輸入框大小
- `--pin-input-gap` - 輸入框間距
- `--pin-input-border-color` - 邊框顏色
- `--pin-input-focus-color` - 焦點顏色
- `--pin-input-disabled-color` - 禁用狀態顏色

## 可訪問性合約

### ARIA 屬性
- `role="group"` - 整個組件標記為群組
- `aria-label="密碼輸入"` - 描述組件用途
- `aria-describedby` - 關聯說明文字（如果有）

### 鍵盤支援
- **Tab/Shift+Tab**: 在輸入框間移動
- **數字鍵 0-9**: 輸入數字
- **Backspace/Delete**: 刪除字符
- **左右方向鍵**: 可選的框間移動（未來功能）

### 螢幕閱讀器
- 每個輸入框有適當的標籤
- 狀態改變時提供音訊反饋
- 支援語音輸入模式

## 錯誤處理合約

### 輸入錯誤
- **無效字符**: 靜默忽略，不顯示錯誤
- **超長輸入**: 自動截斷到允許長度
- **空值處理**: 空字串視為有效輸入

### 系統錯誤
- **DOM 不存在**: 降級處理，不拋出異常
- **事件失敗**: 記錄警告，繼續執行
- **焦點失敗**: 嘗試替代方案

## 效能合約

### 響應時間
- **輸入響應**: < 16ms（60fps）
- **焦點切換**: < 16ms
- **值更新**: < 16ms

### 記憶體使用
- **DOM 元素**: 最多 length + 1 個元素
- **事件監聽器**: 每個輸入框最多 3 個監聽器
- **記憶體洩漏**: 組件卸載時完全清理

### 渲染優化
- **避免不必要重渲染**: 使用 memo 和 computed
- **批量更新**: 狀態改變批量處理
- **DOM 操作最小化**: 只更新必要的 DOM 屬性
