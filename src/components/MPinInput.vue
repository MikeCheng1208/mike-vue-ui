<script setup>
import { ref, computed, nextTick, watch } from "vue";

// PinInput 組件 - 用於輸入密碼或驗證碼
// 支援自定義長度、智能焦點管理和刪除行為

// Props 定義
const props = defineProps({
  // 輸入框數量，預設為 5
  length: {
    type: Number,
    default: 5,
    validator: (value) => value > 0 && value <= 10,
  },
  // 是否禁用組件
  disabled: {
    type: Boolean,
    default: false,
  },
  // v-model 綁定值
  modelValue: {
    type: String,
    default: "",
  },
});

// Emits 定義
const emit = defineEmits([
  "update:modelValue", // v-model 更新事件
  "complete", // 輸入完成事件
  "change", // 單個輸入框改變事件
]);

// 響應式狀態管理
const inputValues = ref([]); // 每個輸入框的值陣列
const currentIndex = ref(0); // 當前焦點所在的輸入框索引
const inputRefs = ref([]); // 輸入框 DOM 元素引用陣列

// 初始化輸入框值陣列
const initializeValues = () => {
  inputValues.value = new Array(props.length).fill("");

  // 如果有初始值，填入對應的輸入框
  if (props.modelValue) {
    const chars = props.modelValue.split("").slice(0, props.length);
    chars.forEach((char, index) => {
      if (/^\d$/.test(char)) {
        inputValues.value[index] = char;
      }
    });
    // 設定焦點到下一個空框
    const nextEmptyIndex = inputValues.value.findIndex((val) => val === "");
    currentIndex.value =
      nextEmptyIndex === -1 ? props.length - 1 : nextEmptyIndex;
  }
};

// 計算完整的輸入值
const fullValue = computed(() => inputValues.value.join(""));

// 監聽 props.length 變化，重新初始化
watch(
  () => props.length,
  () => {
    initializeValues();
  },
  { immediate: true }
);

// 監聽 modelValue 變化，同步到內部狀態
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== fullValue.value) {
      initializeValues();
    }
  }
);

// 監聽內部值變化，發射事件
watch(fullValue, (newValue) => {
  // 發射 v-model 更新事件
  emit("update:modelValue", newValue);

  // 檢查是否完成輸入
  if (
    newValue.length === props.length &&
    newValue.split("").every((char) => /^\d$/.test(char))
  ) {
    emit("complete", newValue);
  }
});

// DOM refs 管理
const setInputRef = (el, index) => {
  if (el) {
    inputRefs.value[index] = el;
  }
};

// 設定焦點到指定輸入框
const focusInput = (index) => {
  if (index >= 0 && index < props.length && inputRefs.value[index]) {
    inputRefs.value[index].focus();
    currentIndex.value = index;
  }
};

// 輸入驗證 - 只允許數字字符
const isValidInput = (value) => {
  return /^\d$/.test(value);
};

// 處理輸入事件
const handleInput = (event, index) => {
  if (props.disabled) return;

  const inputValue = event.target.value;
  const lastChar = inputValue.slice(-1); // 取最後一個字符

  // 驗證輸入字符
  if (lastChar && !isValidInput(lastChar)) {
    // 無效字符，恢復原值
    event.target.value = inputValues.value[index];
    return;
  }

  // 更新值
  if (lastChar && isValidInput(lastChar)) {
    inputValues.value[index] = lastChar;

    // 發射 change 事件
    emit("change", fullValue.value, index);

    // 自動跳轉到下一個輸入框
    if (index < props.length - 1) {
      nextTick(() => {
        focusInput(index + 1);
      });
    }
  } else if (inputValue === "") {
    // 清空當前框
    inputValues.value[index] = "";
    emit("change", fullValue.value, index);
  }
};

// 處理鍵盤事件
const handleKeydown = (event, index) => {
  if (props.disabled) return;

  const { key } = event;

  // 處理退格鍵
  if (key === "Backspace") {
    event.preventDefault();

    if (inputValues.value[index] !== "") {
      // 當前框有值，清空當前框
      inputValues.value[index] = "";
      emit("change", fullValue.value, index);
    } else if (index > 0) {
      // 當前框無值，跳到前一框並清空
      inputValues.value[index - 1] = "";
      emit("change", fullValue.value, index - 1);
      nextTick(() => {
        focusInput(index - 1);
      });
    }
    return;
  }

  // 處理刪除鍵
  if (key === "Delete") {
    event.preventDefault();
    inputValues.value[index] = "";
    emit("change", fullValue.value, index);
    return;
  }

  // 處理方向鍵
  if (key === "ArrowLeft" && index > 0) {
    event.preventDefault();
    focusInput(index - 1);
    return;
  }

  if (key === "ArrowRight" && index < props.length - 1) {
    event.preventDefault();
    focusInput(index + 1);
    return;
  }

  // 處理數字鍵直接輸入
  if (isValidInput(key)) {
    event.preventDefault();
    inputValues.value[index] = key;
    emit("change", fullValue.value, index);

    // 自動跳轉到下一個輸入框
    if (index < props.length - 1) {
      nextTick(() => {
        focusInput(index + 1);
      });
    }
    return;
  }

  // 阻止其他非數字字符
  if (
    !/^(Tab|Shift|Control|Alt|Meta|CapsLock)$/.test(key) &&
    !key.startsWith("Arrow")
  ) {
    event.preventDefault();
  }
};

// 處理焦點事件
const handleFocus = (index) => {
  if (props.disabled) return;
  currentIndex.value = index;
};

// 處理點擊事件
const handleClick = (index) => {
  if (props.disabled) return;
  focusInput(index);
};

// 程式化方法 - 對外暴露的 API
const focus = (index) => {
  if (typeof index === "number") {
    // 指定索引
    focusInput(index);
  } else {
    // 找到下一個空框
    const emptyIndex = inputValues.value.findIndex((val) => val === "");
    const targetIndex = emptyIndex === -1 ? props.length - 1 : emptyIndex;
    focusInput(targetIndex);
  }
};

const clear = () => {
  inputValues.value = new Array(props.length).fill("");
  currentIndex.value = 0;
  nextTick(() => {
    focusInput(0);
  });
};

const getValue = () => {
  return fullValue.value;
};

const setValue = (value) => {
  if (typeof value !== "string") return;

  // 清空現有值
  inputValues.value = new Array(props.length).fill("");

  // 設定新值
  const chars = value.split("").slice(0, props.length);
  chars.forEach((char, index) => {
    if (isValidInput(char)) {
      inputValues.value[index] = char;
    }
  });

  // 設定焦點到下一個空框
  const nextEmptyIndex = inputValues.value.findIndex((val) => val === "");
  const targetIndex = nextEmptyIndex === -1 ? props.length - 1 : nextEmptyIndex;

  nextTick(() => {
    focusInput(targetIndex);
  });
};

// 暴露給父組件的方法
defineExpose({
  focus,
  clear,
  getValue,
  setValue,
});
</script>

<template>
  <!-- PinInput 組件模板 -->
  <div
    class="m-pin-input"
    role="group"
    :aria-label="`密碼輸入，共 ${length} 位數`"
  >
    <input
      v-for="(value, index) in inputValues"
      :key="index"
      :ref="(el) => setInputRef(el, index)"
      :value="value"
      type="text"
      inputmode="numeric"
      autocomplete="off"
      maxlength="1"
      class="m-pin-input__item"
      :class="{
        'm-pin-input__item--focused': currentIndex === index,
        'm-pin-input__item--filled': value !== '',
        'm-pin-input__item--disabled': disabled,
      }"
      :disabled="disabled"
      :aria-label="`第 ${index + 1} 位數字`"
      @input="handleInput($event, index)"
      @keydown="handleKeydown($event, index)"
      @focus="handleFocus(index)"
      @click="handleClick(index)"
    />
  </div>
</template>

<style scoped>
/* PinInput 組件樣式 */

/* CSS 變數 - 支援主題自定義 */
.m-pin-input {
  --pin-input-size: 48px;
  --pin-input-gap: 8px;
  --pin-input-border-color: #d1d5db;
  --pin-input-border-width: 1px;
  --pin-input-border-radius: 6px;
  --pin-input-focus-color: #3b82f6;
  --pin-input-focus-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  --pin-input-disabled-color: #9ca3af;
  --pin-input-disabled-bg: #f9fafb;
  --pin-input-text-color: #1f2937;
  --pin-input-font-size: 18px;
  --pin-input-font-weight: 500;
  --pin-input-bg-color: #ffffff;
}

/* 容器樣式 */
.m-pin-input {
  display: flex;
  align-items: center;
  gap: var(--pin-input-gap);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}

/* 輸入框基礎樣式 */
.m-pin-input__item {
  width: var(--pin-input-size);
  height: var(--pin-input-size);
  border: var(--pin-input-border-width) solid var(--pin-input-border-color);
  border-radius: var(--pin-input-border-radius);
  background-color: var(--pin-input-bg-color);
  color: var(--pin-input-text-color);
  font-size: var(--pin-input-font-size);
  font-weight: var(--pin-input-font-weight);
  text-align: center;
  outline: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  /* 移除預設樣式 */
  -webkit-appearance: none;
  -moz-appearance: textfield;
  appearance: none;
  margin: 0;
  padding: 0;

  /* 禁止選取文字 */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* 移除數字輸入框的上下箭頭 */
.m-pin-input__item::-webkit-outer-spin-button,
.m-pin-input__item::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* 焦點狀態 */
.m-pin-input__item:focus,
.m-pin-input__item--focused {
  border-color: var(--pin-input-focus-color);
  box-shadow: var(--pin-input-focus-shadow);
  transform: scale(1.02);
}

/* 填充狀態 */
.m-pin-input__item--filled {
  background-color: rgba(59, 130, 246, 0.05);
  border-color: var(--pin-input-focus-color);
}

/* 禁用狀態 */
.m-pin-input__item--disabled {
  background-color: var(--pin-input-disabled-bg);
  border-color: var(--pin-input-disabled-color);
  color: var(--pin-input-disabled-color);
  cursor: not-allowed;
  transform: none;
}

.m-pin-input__item--disabled:focus {
  box-shadow: none;
  transform: none;
}

/* Hover 效果 */
.m-pin-input__item:hover:not(:disabled):not(:focus) {
  border-color: var(--pin-input-focus-color);
}

/* 響應式設計 */
@media (max-width: 640px) {
  .m-pin-input {
    --pin-input-size: 40px;
    --pin-input-gap: 6px;
    --pin-input-font-size: 16px;
  }
}

@media (max-width: 480px) {
  .m-pin-input {
    --pin-input-size: 36px;
    --pin-input-gap: 4px;
    --pin-input-font-size: 14px;
  }
}

/* 高對比度模式支援 */
@media (prefers-contrast: high) {
  .m-pin-input {
    --pin-input-border-color: #000000;
    --pin-input-focus-color: #000000;
    --pin-input-text-color: #000000;
  }
}

/* 減少動畫模式支援 */
@media (prefers-reduced-motion: reduce) {
  .m-pin-input__item {
    transition: none;
  }

  .m-pin-input__item:focus,
  .m-pin-input__item--focused {
    transform: none;
  }
}

/* 深色模式支援 */
@media (prefers-color-scheme: dark) {
  .m-pin-input {
    --pin-input-border-color: #374151;
    --pin-input-bg-color: #1f2937;
    --pin-input-text-color: #f9fafb;
    --pin-input-disabled-bg: #111827;
    --pin-input-disabled-color: #6b7280;
  }

  .m-pin-input__item--filled {
    background-color: rgba(59, 130, 246, 0.2);
  }
}

/* 列印樣式 */
@media print {
  .m-pin-input__item {
    border: 2px solid #000000 !important;
    background: transparent !important;
    box-shadow: none !important;
  }
}
</style>
