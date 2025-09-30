<script setup>
import { ref, computed, watch, nextTick } from "vue";

// MInputTags 元件 - 標籤輸入 UI 元件
// 支援使用 ref 包裹 Array 管理標籤，Enter 鍵新增，X 按鈕移除

// Props 定義
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
    validator: (value) => Array.isArray(value) && value.every((item) => typeof item === "string"),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  maxTags: {
    type: Number,
    default: null,
    validator: (value) => value === null || (typeof value === "number" && value > 0),
  },
  maxTagLength: {
    type: Number,
    default: 150,
    validator: (value) => typeof value === "number" && value > 0,
  },
  placeholder: {
    type: String,
    default: "輸入後按 Enter 新增標籤",
  },
});

// Emits 定義
const emit = defineEmits([
  "update:modelValue", // v-model 雙向綁定
  "add", // 新增標籤時觸發 (tag: string)
  "remove", // 移除標籤時觸發 (tag: string, index: number)
  "limit-reached", // 達到數量上限時觸發
]);

// 核心狀態：使用 ref 包裹陣列
const tags = ref([]);
const currentInput = ref("");
const inputRef = ref(null);

// 計算屬性
const isLimitReached = computed(() => {
  return props.maxTags !== null && tags.value.length >= props.maxTags;
});

const canAddTag = computed(() => {
  return !props.disabled && !isLimitReached.value;
});

// 初始化：從 props.modelValue 載入
watch(
  () => props.modelValue,
  (newValue) => {
    if (JSON.stringify(newValue) !== JSON.stringify(tags.value)) {
      tags.value = [...newValue];
    }
  },
  { immediate: true, deep: true }
);

// 同步到外部：v-model 雙向綁定
watch(
  tags,
  (newValue) => {
    emit("update:modelValue", newValue);
  },
  { deep: true }
);

// 新增標籤邏輯（使用 push 符合使用者需求）
const addTag = (text) => {
  // 驗證 1: 去除空白
  const trimmed = text.trim();
  if (!trimmed) {
    return; // 空白輸入，不處理
  }

  // 驗證 2: 檢查數量上限
  if (isLimitReached.value) {
    emit("limit-reached");
    return;
  }

  // 驗證 3: 檢查長度限制
  if (trimmed.length > props.maxTagLength) {
    return;
  }

  // 新增到陣列（使用 push 符合使用者需求）
  tags.value.push(trimmed);

  // 觸發事件
  emit("add", trimmed);
  // update:modelValue 由 watch 自動觸發

  // 清空輸入
  currentInput.value = "";
};

// Enter 鍵處理
const handleKeydown = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTag(currentInput.value);
  }
  // 注意：根據澄清決策，Backspace 鍵在輸入框為空時不做任何動作
};

// 移除標籤邏輯（使用 splice）
const removeTag = (index) => {
  // 驗證索引有效性
  if (index < 0 || index >= tags.value.length) {
    return;
  }

  // 取得要移除的標籤
  const tag = tags.value[index];

  // 從陣列移除（使用 splice）
  tags.value.splice(index, 1);

  // 觸發事件
  emit("remove", tag, index);
  // update:modelValue 由 watch 自動觸發
};

// 暴露給父元件的方法
defineExpose({
  // 聚焦輸入框
  focus: () => {
    inputRef.value?.focus();
  },

  // 清空所有標籤
  clear: () => {
    tags.value = [];
    emit("update:modelValue", []);
  },

  // 程式化新增標籤
  addTag: (text) => {
    addTag(text);
  },

  // 程式化移除標籤
  removeTag: (index) => {
    removeTag(index);
  },

  // 取得所有標籤（回傳副本）
  getTags: () => {
    return [...tags.value];
  },
});
</script>

<template>
  <!-- 容器 -->
  <div class="m-input-tags" role="group" aria-label="標籤輸入" :class="{ 'm-input-tags--disabled': disabled }">
    <!-- 標籤列表容器（支援水平滾動） -->
    <div class="m-input-tags__container">
      <!-- 標籤項目 -->
      <div
        v-for="(tag, index) in tags"
        :key="index"
        class="m-input-tags__tag"
        role="listitem"
        :aria-label="`標籤: ${tag}`"
      >
        <!-- 標籤文字（支援截斷） -->
        <span class="m-input-tags__tag-text" :title="tag">
          {{ tag }}
        </span>

        <!-- 移除按鈕 -->
        <button
          type="button"
          class="m-input-tags__tag-remove"
          :aria-label="`移除標籤 ${tag}`"
          :disabled="disabled"
          @click="removeTag(index)"
        >
          ×
        </button>
      </div>

      <!-- 輸入框 -->
      <input
        ref="inputRef"
        v-model="currentInput"
        type="text"
        class="m-input-tags__input"
        :placeholder="isLimitReached ? '已達標籤數量上限' : placeholder"
        :disabled="disabled || isLimitReached"
        :aria-label="placeholder"
        @keydown="handleKeydown"
      />
    </div>
  </div>
</template>

<style scoped>
/* CSS 變數 - 支援主題自定義 */
.m-input-tags {
  /* 容器 */
  --input-tags-height: 40px;
  --input-tags-padding: 8px;
  --input-tags-gap: 8px;
  --input-tags-border-color: #d1d5db;
  --input-tags-border-width: 1px;
  --input-tags-border-radius: 6px;
  --input-tags-bg-color: #ffffff;
  --input-tags-focus-color: #3b82f6;
  --input-tags-focus-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);

  /* 標籤 */
  --input-tags-tag-bg: #f3f4f6;
  --input-tags-tag-color: #1f2937;
  --input-tags-tag-padding: 4px 8px;
  --input-tags-tag-border-radius: 4px;
  --input-tags-tag-font-size: 14px;
  --input-tags-tag-max-width: 200px;

  /* 移除按鈕 */
  --input-tags-remove-size: 16px;
  --input-tags-remove-color: #6b7280;
  --input-tags-remove-hover-color: #ef4444;

  /* 輸入框 */
  --input-tags-input-font-size: 14px;
  --input-tags-input-color: #1f2937;
  --input-tags-input-placeholder-color: #9ca3af;

  /* 禁用狀態 */
  --input-tags-disabled-bg: #f9fafb;
  --input-tags-disabled-color: #9ca3af;
}

/* 容器樣式 */
.m-input-tags {
  display: inline-block;
  width: 100%;
  min-height: var(--input-tags-height);
  padding: var(--input-tags-padding);
  border: var(--input-tags-border-width) solid var(--input-tags-border-color);
  border-radius: var(--input-tags-border-radius);
  background-color: var(--input-tags-bg-color);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
}

.m-input-tags:focus-within {
  border-color: var(--input-tags-focus-color);
  box-shadow: var(--input-tags-focus-shadow);
}

/* 標籤列表容器（水平滾動） */
.m-input-tags__container {
  display: flex;
  align-items: center;
  gap: var(--input-tags-gap);
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scroll-behavior: smooth;
}

/* 隱藏滾動條但保留功能 */
.m-input-tags__container::-webkit-scrollbar {
  height: 4px;
}

.m-input-tags__container::-webkit-scrollbar-thumb {
  background: var(--input-tags-border-color);
  border-radius: 2px;
}

/* 標籤樣式 */
.m-input-tags__tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: var(--input-tags-tag-padding);
  background-color: var(--input-tags-tag-bg);
  color: var(--input-tags-tag-color);
  border-radius: var(--input-tags-tag-border-radius);
  font-size: var(--input-tags-tag-font-size);
  line-height: 1;
  flex-shrink: 0;
  transition: all 0.2s ease-out;
}

/* 標籤文字（截斷） */
.m-input-tags__tag-text {
  max-width: var(--input-tags-tag-max-width);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 移除按鈕 */
.m-input-tags__tag-remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--input-tags-remove-size);
  height: var(--input-tags-remove-size);
  padding: 0;
  border: none;
  background: transparent;
  color: var(--input-tags-remove-color);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s;
}

.m-input-tags__tag-remove:hover:not(:disabled) {
  color: var(--input-tags-remove-hover-color);
}

.m-input-tags__tag-remove:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* 輸入框樣式 */
.m-input-tags__input {
  flex: 1;
  min-width: 120px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--input-tags-input-color);
  font-size: var(--input-tags-input-font-size);
  outline: none;
}

.m-input-tags__input::placeholder {
  color: var(--input-tags-input-placeholder-color);
}

.m-input-tags__input:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 禁用狀態 */
.m-input-tags--disabled {
  background-color: var(--input-tags-disabled-bg);
  cursor: not-allowed;
}

.m-input-tags--disabled .m-input-tags__tag {
  opacity: 0.6;
}

/* 響應式設計 */
@media (max-width: 640px) {
  .m-input-tags {
    --input-tags-height: 36px;
    --input-tags-padding: 6px;
    --input-tags-gap: 6px;
    --input-tags-tag-font-size: 13px;
    --input-tags-tag-max-width: 150px;
  }
}

@media (max-width: 480px) {
  .m-input-tags {
    --input-tags-height: 32px;
    --input-tags-padding: 4px;
    --input-tags-gap: 4px;
    --input-tags-tag-font-size: 12px;
    --input-tags-tag-max-width: 120px;
  }
}

/* 深色模式支援 */
@media (prefers-color-scheme: dark) {
  .m-input-tags {
    --input-tags-border-color: #374151;
    --input-tags-bg-color: #1f2937;
    --input-tags-tag-bg: #374151;
    --input-tags-tag-color: #f9fafb;
    --input-tags-input-color: #f9fafb;
    --input-tags-input-placeholder-color: #9ca3af;
    --input-tags-disabled-bg: #111827;
  }
}

/* 高對比度模式支援 */
@media (prefers-contrast: high) {
  .m-input-tags {
    --input-tags-border-color: #000000;
    --input-tags-focus-color: #000000;
    --input-tags-tag-color: #000000;
  }
}

/* 減少動畫模式支援 */
@media (prefers-reduced-motion: reduce) {
  .m-input-tags__tag,
  .m-input-tags__tag-remove {
    transition: none;
  }
}
</style>
