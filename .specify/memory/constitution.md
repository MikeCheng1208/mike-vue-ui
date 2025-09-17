# mike-vue-ui 前端 UI 庫 Constitution

## Core Principles

### I. 輸出文內容 (NON-NEGOTIABLE)
 plan.md、specify.md、tasks.md 以及其他的 .md 所有的敘述性的回答都需要使用正體中文來進行輸出，如果是專有名詞可以維持英文，或是用括號把翻譯後的內容放進去；程式碼變數使用英文但註釋用中文；錯誤訊息使用正體中文；API 文檔使用正體中文說明

### II. Test-Driven Development
不需要寫任何的測試，或是單元測試

### III. 正體中文文檔
所有文檔、註釋、README(包括 plan.md、specify.md、tasks.md) 使用正體中文；程式碼變數使用英文但註釋用中文；錯誤訊息使用正體中文；API 文檔使用正體中文說明

### IV. 文件內容篩選 (NON-NEGOTIABLE)
plan.md、specify.md、tasks.md 以及其他的 .md 有可能產生完成後有不需要的內容，所以當產生完後需要把不必要不相關的內容給移除


<!-- Example: II. CLI Interface -->
<!-- Example: III. Test-First (NON-NEGOTIABLE) -->
<!-- Example: IV. Integration Testing -->
<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->

## 技術約束

### I. 基本準則  (NON-NEGOTIABLE)
維持現有的架構及 coding style 去進行擴充跟開發

### II. 技術的選擇
前端使用純 JavaScript ES6+ 來進行開發，不使用 TypeScript；Nodejs 的版本是 v20.19.4；CSS 的部分則維持，不使用其他CSS 框架；

### III. Coding Style (NON-NEGOTIABLE)
所有的技術的 Coding Style 請使用最佳實踐