# 資料模型: PinInput 組件

**日期**: 2025-09-17  
**功能**: PinInput 密碼輸入組件資料結構  
**狀態**: 完成

## 核心實體

### PinInput 組件狀態
主要組件的響應式狀態管理

#### 屬性
- **inputValues**: `Array<string>` - 每個輸入框的值陣列
- **currentIndex**: `number` - 當前焦點所在的輸入框索引
- **isDisabled**: `boolean` - 組件是否禁用
- **length**: `number` - 輸入框總數量（預設 5）
- **inputRefs**: `Array<HTMLInputElement>` - 輸入框 DOM 元素引用陣列

#### 狀態轉換
1. **初始化**: 所有 inputValues 為空字串，currentIndex 為 0
2. **輸入字符**: 
   - 更新對應索引的 inputValues
   - currentIndex 移動到下一個位置（如果不是最後一個）
3. **刪除字符**:
   - 當前框有值: 清空當前框值，currentIndex 不變
   - 當前框無值: currentIndex 移動到前一個，清空前一個框值
4. **完成輸入**: 所有 inputValues 都有值時觸發 complete 事件

#### 驗證規則
- 每個 inputValue 必須是單一數字字符 (0-9)
- inputValues 陣列長度等於 length 屬性
- currentIndex 範圍: 0 ≤ currentIndex < length

### InputBox 實體
單個輸入框的邏輯實體

#### 屬性
- **value**: `string` - 輸入框的值（單一字符）
- **index**: `number` - 在陣列中的位置索引
- **isFocused**: `boolean` - 是否為當前焦點
- **isDisabled**: `boolean` - 是否禁用
- **ref**: `HTMLInputElement` - DOM 元素引用

#### 行為
- **focus()**: 設定焦點到此輸入框
- **blur()**: 移除焦點
- **setValue(value)**: 設定值並觸發相應事件
- **clear()**: 清空值

## 組件介面

### Props 介面
```javascript
interface PinInputProps {
  length: number;        // 預設: 5
  disabled: boolean;     // 預設: false
  modelValue: string;    // v-model 綁定值
}
```

### Emits 介面
```javascript
interface PinInputEmits {
  'update:modelValue': (value: string) => void;  // v-model 更新
  'complete': (value: string) => void;           // 輸入完成
  'change': (value: string, index: number) => void; // 單個框值改變
}
```

### Expose 介面
```javascript
interface PinInputExpose {
  focus: (index?: number) => void;    // 設定焦點到指定索引
  clear: () => void;                  // 清空所有輸入
  getValue: () => string;             // 獲取完整值
  setValue: (value: string) => void;  // 設定完整值
}
```

## 狀態管理流程

### 輸入流程
```
使用者輸入數字 → 驗證字符 → 更新 inputValues[currentIndex] → 
發射 change 事件 → 更新 modelValue → 移動焦點到下一框 → 
檢查是否完成 → 發射 complete 事件（如果完成）
```

### 刪除流程
```
使用者按刪除鍵 → 檢查當前框是否有值 → 
有值: 清空當前框 → 發射 change 事件 → 更新 modelValue
無值: 移動到前一框 → 清空前一框 → 發射 change 事件 → 更新 modelValue
```

### 程式化操作流程
```
調用 setValue(value) → 拆分字串為字符陣列 → 
驗證每個字符 → 更新 inputValues → 更新 modelValue → 
設定焦點到適當位置
```

## 資料驗證

### 輸入驗證
- **字符驗證**: `/^\d$/` - 只允許單一數字字符
- **長度驗證**: 總字串長度不超過 length 屬性
- **索引驗證**: 0 ≤ index < length

### 狀態一致性
- inputValues 陣列長度始終等於 length
- modelValue 等於 inputValues.join('')
- currentIndex 始終在有效範圍內
- 焦點狀態與 currentIndex 一致

## 性能考量

### 響應式優化
- 使用 `shallowRef` 管理 inputRefs 陣列
- 使用 `computed` 計算衍生狀態
- 避免不必要的響應式包裝

### 記憶體管理
- 組件卸載時清理所有 refs
- 避免循環引用
- 適時清理事件監聽器

## 錯誤處理

### 異常情況
- 無效字符輸入: 忽略並保持原狀態
- 索引越界: 自動修正到有效範圍
- DOM 元素不存在: 靜默處理，不拋出錯誤
- 雙重綁定衝突: 使用單向綁定避免 v-model 與自定義事件處理器衝突

### 降級處理
- 焦點設定失敗: 嘗試設定到第一個可用框
- 值設定失敗: 重置為空狀態
- 事件發射失敗: 記錄警告但不中斷執行
- 綁定衝突檢測: 開發階段警告雙重綁定問題
