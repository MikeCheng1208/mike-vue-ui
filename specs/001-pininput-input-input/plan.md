
# 實作計劃: PinInput 組件

**分支**: `001-pininput-input-input` | **日期**: 2025-09-17 | **規格**: [spec.md](spec.md)
**輸入**: 功能規格來自 `/specs/001-pininput-input-input/spec.md`


## 摘要
開發一個 PinInput 組件用於輸入密碼或驗證碼，預設為5位數但可自定義長度。組件需要提供智能的焦點管理：輸入時自動跳轉到下一個框，刪除時根據當前框是否為空決定行為（空則跳到前一框並清除，非空則清除當前框）。使用 Vue3 Composition API 和 setup script 語法糖實作。

## 技術背景
**語言/版本**: JavaScript ES6+, Vue3 Composition API  
**主要相依性**: Vue 3, 使用 setup script 語法糖, SFC (Single File Component)  
**儲存**: N/A (純 UI 組件)  
**測試**: 不需要測試 (根據憲章)  
**目標平台**: 現代瀏覽器 (支援 ES6+)  
**專案類型**: single (UI 庫組件)  
**效能目標**: 流暢的使用者互動體驗, 即時響應輸入  
**限制條件**: 使用者指定技術要求: Vue3 + setup script + SFC 順序 (script > template > style) + ES6+ + 最佳實踐  
**規模/範圍**: 單一可重用 Vue 組件

## 憲章檢查
*門檻: 必須在階段 0 研究前通過。階段 1 設計後重新檢查。*

### I. 輸出內容 (不可協商)
- ✅ **通過**: 所有文檔使用正體中文，程式碼註釋使用中文，變數名使用英文
- ✅ **通過**: 錯誤訊息將使用正體中文

### II. 測試驅動開發
- ✅ **通過**: 根據憲章不需要撰寫測試

### III. 正體中文文檔
- ✅ **通過**: 計劃文檔使用正體中文，API 文檔將使用正體中文說明

### 技術約束

#### I. 基本準則 (不可協商)
- ✅ **通過**: 維持現有架構和編碼風格進行擴充

#### II. 技術選擇
- ✅ **通過**: 使用純 JavaScript ES6+，不使用 TypeScript
- ✅ **通過**: 維持現有 CSS 方式，不使用其他 CSS 框架

#### III. 編碼風格 (不可協商)
- ✅ **通過**: 將採用最佳實踐的編碼風格

## 專案結構

### 文檔結構
```
specs/001-pininput-input-input/
├── plan.md              # 實作計劃（本文件）
├── research.md          # 技術研究
├── data-model.md        # 資料模型
├── quickstart.md        # 快速開始指南
└── contracts/           # API 合約
    └── component-api.md
```

### 原始碼結構
```
src/
├── components/
│   ├── MEmailInput.vue     # 現有組件
│   ├── MPureTable.vue      # 現有組件  
│   └── MPinInput.vue       # 新增組件
└── index.js                # 組件導出

example/
└── pin-input.html          # 範例頁面
```


## 實作任務概覽

### 核心開發任務
1. **組件結構建立** - 建立 MPinInput.vue 基本結構
2. **Props 和 Emits 定義** - 實作組件介面
3. **響應式狀態管理** - 實作 inputValues, currentIndex 等狀態
4. **DOM Refs 管理** - 實作輸入框引用陣列
5. **輸入事件處理** - 實作 input 和 keydown 事件監聽
6. **焦點管理邏輯** - 實作自動跳轉和焦點控制
7. **刪除行為邏輯** - 實作智能刪除行為
8. **輸入驗證** - 實作數字字符驗證
9. **程式化方法** - 實作 focus, clear, getValue, setValue 方法

### 樣式和整合任務
10. **CSS 樣式實作** - 實作組件樣式和 CSS 變數
11. **可訪問性支援** - 實作 ARIA 屬性和鍵盤導航
12. **組件導出** - 更新 src/index.js 導出新組件
13. **範例頁面** - 建立 example/pin-input.html
14. **文檔完善** - 更新 README 和使用說明

## 進度狀態

### 已完成階段
- ✅ **研究階段**: 技術決策和最佳實踐研究完成
- ✅ **設計階段**: 資料模型、API 合約、快速開始指南完成
- ✅ **規劃階段**: 實作任務概覽完成
- ✅ **憲章檢查**: 所有憲章要求通過驗證

### 下一步
準備執行 `/tasks` 命令生成詳細的實作任務清單，然後開始組件開發。
