# Implementation Plan: InputTags UI 元件

**Branch**: `002-inputtags-ui-component` | **Date**: 2025-09-30 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/002-inputtags-ui-component/spec.md`  
**User Requirements**: 使用這個 UI 時，針對 Array 去做新增，顯示的 UI 內容會 push 到 Array 裡面，使用 ref 包 Array

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → ✅ Loaded and verified Clarifications section exists
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → ✅ Detected project type: Single Vue 3 component library
   → ✅ Set Structure Decision: src/components/ pattern
3. Fill the Constitution Check section
   → ✅ Based on constitution.md requirements
4. Evaluate Constitution Check section
   → ✅ No violations, proceeds to Phase 0
5. Execute Phase 0 → research.md
   → 進行中
6. Execute Phase 1 → contracts, data-model.md, quickstart.md
   → 待執行
7. Re-evaluate Constitution Check section
   → 待執行
8. Plan Phase 2 → Describe task generation approach
   → 待執行
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 8. Phase 2 (tasks.md generation) is executed by /tasks command.

## Summary

InputTags UI 元件是一個 Vue 3 單一檔案組件（SFC），讓使用者能夠透過文字輸入創建多個標籤。每個標籤顯示為視覺化的項目，帶有移除按鈕。組件內部使用響應式 Array（ref 包裹）來管理標籤集合，當使用者按下 Enter 鍵時，輸入的文字會被 push 到陣列中並渲染為標籤。

**核心技術方案**:
- Vue 3 Composition API 使用 `ref()` 管理標籤陣列
- 單行水平滾動佈局，支援動態標籤數量
- 長文字自動截斷顯示省略號
- 可配置的標籤數量上限
- 遵循 mike-vue-ui 專案現有的命名和架構模式（M 前綴）

## Technical Context

**Language/Version**: JavaScript ES6+ (Vue 3.3.4), Node.js v20.19.4  
**Primary Dependencies**: Vue 3.3.4, @vueuse/core 10.2.1, UnoCSS 0.53.6  
**Storage**: N/A (組件內部狀態管理)  
**Testing**: 不需要單元測試（根據 constitution）  
**Target Platform**: 現代瀏覽器（支援 ES6+ 和 Vue 3）  
**Project Type**: Single - Vue 3 UI 組件庫  
**Performance Goals**: 流暢的標籤新增/移除動畫（60fps），支援至少 100 個標籤無性能問題  
**Constraints**: 
- 必須使用純 JavaScript，不使用 TypeScript
- 遵循專案現有的 coding style 和最佳實踐
- 組件名稱使用 M 前綴（MInputTags）
- CSS 使用 scoped style，支援 CSS 變數自定義
**Scale/Scope**: 單一 Vue 組件，約 300-400 行程式碼（含註釋和樣式）

**Data Management Approach** (根據使用者需求):
```javascript
// 使用 ref 包裹 Array 來管理標籤
const tags = ref([]);

// 新增標籤時使用 push
const addTag = (text) => {
  tags.value.push(text);
};

// 移除標籤時使用 splice
const removeTag = (index) => {
  tags.value.splice(index, 1);
};
```

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. 輸出文內容 (NON-NEGOTIABLE)
- ✅ **PASS**: plan.md、research.md、data-model.md、quickstart.md 使用正體中文
- ✅ **PASS**: 程式碼變數使用英文，註釋使用正體中文
- ✅ **PASS**: 錯誤訊息使用正體中文

### II. Test-Driven Development
- ✅ **PASS**: Constitution 明確規定「不需要寫任何的測試，或是單元測試」

### III. 正體中文文檔
- ✅ **PASS**: 所有文檔使用正體中文，程式碼註釋使用正體中文

### IV. 文件內容篩選 (NON-NEGOTIABLE)
- ✅ **PASS**: 產生的文檔將移除不相關內容

### 資安原則
- ✅ **PASS**: UI 組件不涉及敏感資訊處理
- ✅ **PASS**: 使用者輸入需進行空白字符驗證（已在規格中定義）
- ✅ **PASS**: 使用 v-for 時需正確綁定 :key 防止 XSS

### 技術約束

#### I. 基本準則 (NON-NEGOTIABLE)
- ✅ **PASS**: 維持現有架構（src/components/ 模式）
- ✅ **PASS**: 遵循現有 coding style（參考 MPinInput.vue）

#### II. 技術選擇
- ✅ **PASS**: 使用純 JavaScript ES6+，不使用 TypeScript
- ✅ **PASS**: Node.js v20.19.4
- ✅ **PASS**: 使用現有的 UnoCSS 框架

#### III. Coding Style (NON-NEGOTIABLE)
- ✅ **PASS**: 遵循最佳實踐，參考 MPinInput.vue 的實作模式

**Constitution Check Result**: ✅ PASS - 無違規項目

## Project Structure

### Documentation (this feature)
```
specs/002-inputtags-ui-component/
├── spec.md              # 功能規格（已完成）
├── plan.md              # 本檔案（/plan 指令輸出）
├── research.md          # Phase 0 輸出
├── data-model.md        # Phase 1 輸出
├── quickstart.md        # Phase 1 輸出
├── contracts/           # Phase 1 輸出
│   └── component-api.md # 元件 API 合約
└── tasks.md             # Phase 2 輸出（/tasks 指令生成）
```

### Source Code (repository root)
```
src/
├── components/
│   ├── MEmailInput.vue      # 現有元件
│   ├── MPinInput.vue         # 現有元件（參考範例）
│   ├── MPureTable.vue        # 現有元件
│   └── MInputTags.vue        # 新增元件 ← 本功能
└── index.js                  # 需更新，匯出新元件

example/
└── input-tags.html           # 示例頁面（新增）

dist/                         # 建置輸出
```

**Structure Decision**: 採用 Single Project 結構。mike-vue-ui 是一個 Vue 3 UI 組件庫，所有組件位於 `src/components/` 目錄。新元件 MInputTags.vue 將遵循相同模式，使用 M 前綴命名，並在 src/index.js 中匯出供外部使用。

## Phase 0: Outline & Research

### 研究任務

#### 1. Vue 3 Composition API 最佳實踐
**目標**: 研究如何使用 ref() 管理動態陣列並確保響應性  
**重點**:
- ref() vs reactive() 的使用時機
- 陣列操作（push, splice）如何觸發響應式更新
- v-for 與響應式陣列的最佳實踐

#### 2. 現有元件模式分析
**目標**: 分析 MPinInput.vue 的實作模式作為參考  
**重點**:
- Props 定義模式（使用 defineProps）
- Emits 定義模式（使用 defineEmits）
- v-model 雙向綁定實作
- 方法暴露模式（使用 defineExpose）
- CSS 變數自定義模式
- 響應式設計模式

#### 3. 標籤輸入 UI 模式研究
**目標**: 研究標籤輸入組件的常見 UX 模式  
**重點**:
- 標籤新增的互動模式（Enter 鍵處理）
- 標籤移除的視覺回饋
- 長文字截斷的 CSS 技術（text-overflow: ellipsis）
- 水平滾動的 UX 實作

#### 4. 可訪問性考量
**目標**: 確保元件符合基本可訪問性標準  
**重點**:
- ARIA 標籤使用（role, aria-label）
- 鍵盤操作支援
- 螢幕閱讀器友善

**Output**: research.md 將包含以上研究結果、決策理由和替代方案考量

## Phase 1: Design & Contracts

### 1. 資料模型 (data-model.md)

**核心實體**:

**Tag（標籤）**
- 屬性: text (string) - 標籤文字內容
- 在陣列中的表示: 純字串或物件 `{ text: string, id: number }`
- 生命週期: 建立（Enter 鍵）→ 顯示 → 刪除（點擊 X）

**TagsArray（標籤集合）**
- 類型: `ref<string[]>` 或 `ref<Array<{ text: string, id: number }>>`
- 操作: push（新增）、splice（移除）、clear（清空）
- 初始值: 空陣列或從 props.modelValue 載入

**InputState（輸入狀態）**
- currentInput: string - 當前輸入框的文字
- disabled: boolean - 是否禁用
- maxTags: number | null - 標籤數量上限

### 2. API 合約 (contracts/component-api.md)

**Props**:
```javascript
{
  modelValue: {
    type: Array,      // string[] - 標籤文字陣列
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  maxTags: {
    type: Number,
    default: null    // null 表示無限制
  },
  maxTagLength: {
    type: Number,
    default: 150     // 單個標籤最大字符數
  },
  placeholder: {
    type: String,
    default: '輸入後按 Enter 新增標籤'
  }
}
```

**Emits**:
```javascript
[
  'update:modelValue',  // v-model 更新
  'add',               // 新增標籤時觸發 (tag: string)
  'remove',            // 移除標籤時觸發 (tag: string, index: number)
  'limit-reached'      // 達到數量上限時觸發
]
```

**Exposed Methods**:
```javascript
{
  focus: () => void,              // 聚焦到輸入框
  clear: () => void,              // 清空所有標籤
  addTag: (text: string) => void, // 程式化新增標籤
  removeTag: (index: number) => void, // 程式化移除標籤
  getTags: () => string[]         // 取得所有標籤
}
```

### 3. 快速開始文檔 (quickstart.md)

包含:
- 基本使用範例（v-model 綁定）
- 限制標籤數量範例
- 自定義樣式範例
- 程式化操作範例
- 事件處理範例

### 4. 合約測試

由於 constitution 規定不需要測試，此部分將以文檔形式說明預期行為而非實際測試程式碼。

**Output**: data-model.md, contracts/component-api.md, quickstart.md

## Phase 2: Task Planning Approach
*此章節描述 /tasks 指令將如何執行 - 不在 /plan 指令中執行*

**任務生成策略**:

1. **設計任務** (基於 Phase 1 設計文檔)
   - 建立 MInputTags.vue 檔案結構
   - 定義 props 和 emits
   - 建立基礎模板結構

2. **資料管理實作** (基於 data-model.md)
   - 實作 ref 包裹的 tags 陣列
   - 實作 v-model 雙向綁定
   - 實作陣列操作方法（add/remove）

3. **UI 互動實作** (基於功能需求)
   - 實作 Enter 鍵新增標籤
   - 實作點擊 X 按鈕移除標籤
   - 實作輸入框焦點管理
   - 實作空白字符驗證

4. **樣式實作** (基於 UI 需求)
   - 實作單行水平滾動佈局
   - 實作標籤截斷與省略號
   - 實作 CSS 變數自定義
   - 實作響應式設計
   - 實作深色模式支援

5. **進階功能** (基於功能需求)
   - 實作標籤數量限制
   - 實作 disabled 狀態
   - 實作程式化 API（defineExpose）
   - 實作事件觸發

6. **整合與文檔**
   - 更新 src/index.js 匯出新元件
   - 建立 example/input-tags.html 示例
   - 更新 README.md

**排序策略**:
- 由內而外: 資料模型 → UI 互動 → 樣式 → 進階功能
- 依賴順序: 基礎結構必須先完成
- 標記 [P] 表示可平行執行的任務（如樣式和功能）

**預估輸出**: 約 15-20 個有序任務在 tasks.md 中

**IMPORTANT**: 此階段由 /tasks 指令執行，不在 /plan 指令中執行

## Phase 3+: Future Implementation
*這些階段超出 /plan 指令範圍*

**Phase 3**: 任務執行（/tasks 指令建立 tasks.md）  
**Phase 4**: 實作（依照 tasks.md 執行，遵循 constitutional 原則）  
**Phase 5**: 驗證（執行 quickstart.md，視覺測試，效能驗證）

## Complexity Tracking
*僅在 Constitution Check 有違規需要記錄時填寫*

無違規項目需要記錄。

## Progress Tracking
*此檢查清單在執行流程中更新*

**Phase Status**:
- [x] Phase 0: Research complete (/plan 指令) ✅
- [x] Phase 1: Design complete (/plan 指令) ✅
- [x] Phase 2: Task planning complete (/plan 指令 - 僅描述方法) ✅
- [ ] Phase 3: Tasks generated (/tasks 指令) - 待執行
- [ ] Phase 4: Implementation complete - 待執行
- [ ] Phase 5: Validation passed - 待執行

**Gate Status**:
- [x] Initial Constitution Check: PASS ✅
- [x] Post-Design Constitution Check: PASS ✅
- [x] All NEEDS CLARIFICATION resolved (from /clarify) ✅
- [x] Complexity deviations documented (N/A - no deviations) ✅

**Generated Artifacts**:
- [x] plan.md - 實作計劃（本檔案）
- [x] research.md - 技術研究文檔
- [x] data-model.md - 資料模型設計
- [x] contracts/component-api.md - 元件 API 合約
- [x] quickstart.md - 快速開始指南

---
*Based on Constitution v2.1.1 - See `.specify/memory/constitution.md`*
