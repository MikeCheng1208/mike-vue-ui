# MPinInput 組件快速開始指南

**版本**: v1.0.0  
**日期**: 2025-09-17  
**預計完成時間**: 5 分鐘

## 快速驗證步驟

### 步驟 1: 基本安裝與導入
```bash
# 確認專案環境
cd /Users/mike/Desktop/mike-vue-ui
npm list vue # 應該顯示 Vue 3.x
```

```javascript
// 在測試文件中導入組件
import MPinInput from '../src/components/MPinInput.vue'
```

### 步驟 2: 基本使用測試
建立測試頁面 `example/pin-input.html`：

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MPinInput 組件測試</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
    <div id="app">
        <h2>MPinInput 組件測試</h2>
        
        <!-- 基本使用 -->
        <div class="test-section">
            <h3>基本使用（5位數）</h3>
            <m-pin-input 
                v-model="pinValue1" 
                @complete="onComplete1"
            ></m-pin-input>
            <p>當前值: {{ pinValue1 }}</p>
            <p>完成狀態: {{ completed1 ? '已完成' : '未完成' }}</p>
        </div>

        <!-- 自定義長度 -->
        <div class="test-section">
            <h3>自定義長度（4位數）</h3>
            <m-pin-input 
                v-model="pinValue2" 
                :length="4"
                @complete="onComplete2"
            ></m-pin-input>
            <p>當前值: {{ pinValue2 }}</p>
        </div>

        <!-- 禁用狀態 -->
        <div class="test-section">
            <h3>禁用狀態</h3>
            <m-pin-input 
                v-model="pinValue3" 
                :disabled="true"
            ></m-pin-input>
            <button @click="toggleDisabled">{{ disabled ? '啟用' : '禁用' }}</button>
        </div>

        <!-- 程式化控制 -->
        <div class="test-section">
            <h3>程式化控制</h3>
            <m-pin-input 
                ref="pinInputRef"
                v-model="pinValue4" 
                @change="onChange"
            ></m-pin-input>
            <div class="controls">
                <button @click="setValue">設定值 "1234"</button>
                <button @click="clearValue">清空</button>
                <button @click="focusInput">焦點到第3個</button>
            </div>
        </div>
    </div>

    <script type="module">
        // 這裡會導入實際的組件
        // import MPinInput from '../dist/mike-vue-ui.es.js'
        
        const { createApp, ref } = Vue
        
        // 臨時組件定義（實際實作完成後移除）
        const MPinInput = {
            template: `
                <div class="m-pin-input">
                    <input 
                        v-for="(item, index) in length" 
                        :key="index"
                        class="m-pin-input__item"
                        type="text"
                        maxlength="1"
                        :disabled="disabled"
                    />
                </div>
            `,
            props: {
                length: { type: Number, default: 5 },
                disabled: { type: Boolean, default: false },
                modelValue: { type: String, default: '' }
            },
            emits: ['update:modelValue', 'complete', 'change']
        }

        createApp({
            components: {
                MPinInput
            },
            setup() {
                const pinValue1 = ref('')
                const pinValue2 = ref('')
                const pinValue3 = ref('')
                const pinValue4 = ref('')
                const completed1 = ref(false)
                const disabled = ref(false)
                const pinInputRef = ref(null)

                const onComplete1 = (value) => {
                    completed1.value = true
                    console.log('完成輸入:', value)
                }

                const onComplete2 = (value) => {
                    console.log('4位數完成:', value)
                }

                const onChange = (value, index) => {
                    console.log(`第 ${index + 1} 個框改變:`, value)
                }

                const toggleDisabled = () => {
                    disabled.value = !disabled.value
                }

                const setValue = () => {
                    if (pinInputRef.value) {
                        pinInputRef.value.setValue('1234')
                    }
                }

                const clearValue = () => {
                    if (pinInputRef.value) {
                        pinInputRef.value.clear()
                    }
                }

                const focusInput = () => {
                    if (pinInputRef.value) {
                        pinInputRef.value.focus(2)
                    }
                }

                return {
                    pinValue1,
                    pinValue2,
                    pinValue3,
                    pinValue4,
                    completed1,
                    disabled,
                    pinInputRef,
                    onComplete1,
                    onComplete2,
                    onChange,
                    toggleDisabled,
                    setValue,
                    clearValue,
                    focusInput
                }
            }
        }).mount('#app')
    </script>

    <style>
        .test-section {
            margin: 20px 0;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
        
        .controls {
            margin-top: 10px;
        }
        
        .controls button {
            margin-right: 10px;
            padding: 5px 10px;
        }

        /* 臨時樣式 */
        .m-pin-input {
            display: flex;
            gap: 8px;
        }
        
        .m-pin-input__item {
            width: 40px;
            height: 40px;
            text-align: center;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 18px;
        }
        
        .m-pin-input__item:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
        
        .m-pin-input__item:disabled {
            background-color: #f5f5f5;
            color: #999;
        }
    </style>
</body>
</html>
```

### 步驟 3: 功能驗證清單

#### 基本功能測試
- [ ] **輸入數字**: 在第一個框輸入數字 "1"，應自動跳到第二個框
- [ ] **自動跳轉**: 依序輸入 "12345"，每輸入一個數字都應跳到下一框
- [ ] **完成事件**: 輸入完 5 位數後，應顯示 "已完成" 狀態
- [ ] **非數字拒絕**: 嘗試輸入字母，應被忽略

#### 刪除行為測試
- [ ] **刪除有值框**: 在有值的框按 Backspace，應清空當前框但焦點不移動
- [ ] **刪除空框**: 在空框按 Backspace，應跳到前一框並清空其值
- [ ] **第一框刪除**: 在第一個空框按 Backspace，應無任何反應

#### 自定義功能測試
- [ ] **自定義長度**: 4位數組件應只顯示 4 個輸入框
- [ ] **禁用狀態**: 點擊禁用按鈕後，所有輸入框應變灰且無法輸入
- [ ] **程式化設定**: 點擊 "設定值" 按鈕，應填入 "1234"
- [ ] **程式化清空**: 點擊 "清空" 按鈕，應清空所有值
- [ ] **程式化焦點**: 點擊 "焦點到第3個" 按鈕，第3個框應獲得焦點

#### 可訪問性測試
- [ ] **Tab 導航**: 使用 Tab 鍵應能在輸入框間移動
- [ ] **鍵盤操作**: 所有功能都應可透過鍵盤操作
- [ ] **螢幕閱讀器**: 使用螢幕閱讀器應能正確讀出組件狀態

### 步驟 4: 效能驗證
```javascript
// 在瀏覽器控制台執行效能測試
console.time('輸入響應時間')
// 快速輸入 "12345"
console.timeEnd('輸入響應時間') // 應 < 50ms

console.time('焦點切換時間')
// 點擊不同的輸入框
console.timeEnd('焦點切換時間') // 應 < 20ms
```

### 步驟 5: 整合測試
將組件加入現有的 UI 庫中：

```javascript
// src/index.js
export { default as MPinInput } from './components/MPinInput.vue'
```

```javascript
// 測試整合
import { MPinInput } from '../dist/mike-vue-ui.es.js'
// 應能正常導入和使用
```

## 驗收標準

### 必須通過的測試
1. ✅ 所有基本功能測試通過
2. ✅ 所有刪除行為測試通過  
3. ✅ 所有自定義功能測試通過
4. ✅ 可訪問性測試通過
5. ✅ 效能測試達標
6. ✅ 整合測試成功

### 品質指標
- **功能完整性**: 100% 規格需求實現
- **瀏覽器相容性**: 現代瀏覽器 100% 支援
- **可訪問性**: WCAG 2.1 AA 標準
- **效能**: 所有操作 < 16ms 響應時間
- **程式碼品質**: ESLint 無錯誤，符合最佳實踐

## 故障排除

### 常見問題
1. **第一個字符不顯示**: 檢查是否使用了 `v-model` 與 `@input` 的雙重綁定，應改用 `:value` 單向綁定
2. **焦點不移動**: 檢查 DOM refs 是否正確設定
3. **事件不觸發**: 檢查 emit 是否正確配置
4. **樣式問題**: 檢查 scoped CSS 和 CSS 變數
5. **效能問題**: 檢查是否有不必要的重新渲染

### 綁定衝突診斷
如果遇到輸入字符不顯示的問題，檢查模板是否有以下錯誤模式：
```vue
<!-- ❌ 錯誤：雙重綁定衝突 -->
<input v-model="inputValues[index]" @input="handleInput" />

<!-- ✅ 正確：單向綁定 -->
<input :value="inputValues[index]" @input="handleInput" />
```

### 除錯工具
- Vue DevTools: 檢查組件狀態和事件
- 瀏覽器開發者工具: 檢查 DOM 和樣式
- 效能面板: 分析渲染效能

## 下一步
完成快速驗證後，即可進入生產環境部署和文檔撰寫階段。
