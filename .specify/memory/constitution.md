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


## 資安原則
### I. 安全性標準 (NON-NEGOTIABLE)
所有敏感資訊必須使用環境變數管理；禁止將 API 金鑰、密碼、Token 寫死在程式碼中；使用 .env 檔案管理環境變數，且 .env 檔案必須加入 .gitignore；所有 API 請求必須使用 HTTPS；使用者輸入必須進行驗證和清理；XSS 防護必須在所有動態內容中實作；敏感資料不得儲存在 localStorage 或 sessionStorage；JWT Token 必須設定合理的過期時間

### II. 環境變數管理規範 (NON-NEGOTIABLE)
所有環境變數必須以 VITE_ 前綴開頭；環境變數檔案結構：.env (共用變數)、.env.development (開發環境)、.env.production (正式環境)；.env.example 必須提供範本，說明所需的環境變數；環境變數載入使用 import.meta.env；敏感資訊絕對不可提交到版本控制系統

### III. 安全性程式碼規範
禁止使用 eval() 或 Function() 建構函式；禁止使用 innerHTML 直接插入未清理的 HTML；使用 v-html 時必須確保內容已清理；所有外部連結必須加上 rel="noopener noreferrer"；表單提交必須包含 CSRF 防護；檔案上傳必須驗證檔案類型和大小；敏感操作必須要求二次確認

### IV. Cookie 和儲存管理
Cookie 必須設定 Secure、HttpOnly、SameSite 屬性；localStorage/sessionStorage 僅用於非敏感資料；重要資料必須設定過期時間；登出時必須清除所有儲存的認證資訊


<!-- Example: II. CLI Interface -->
<!-- Example: III. Test-First (NON-NEGOTIABLE) -->
<!-- Example: IV. Integration Testing -->
<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->

## 技術約束

### I. 基本準則  (NON-NEGOTIABLE)
維持現有的架構及 coding style 去進行擴充跟開發

### II. 技術的選擇
前端使用純 JavaScript ES6+ 來進行開發，不使用 TypeScript；Nodejs 的版本是 v20.19.4；CSS 的部分則維持，預設是不使用其他 CSS 框架，但如果專案本身已經有自己使用的 CSS 框架就沿用該專案使用的 CSS 框架

### III. Coding Style (NON-NEGOTIABLE)
所有的技術的 Coding Style 以及做法請使用最佳實踐