<script>
export default {
  name: "MyInput",
  props: {
    modelValue: String,
  },
  methods: {
    updateValue(value) {
      this.$emit("update:modelValue", value);
    },
  },
};
</script>

<template>
  <input :value="modelValue" @input="updateValue($event.target.value)" />
</template>

<style scoped>
input {
  width: 200px;
  height: 40px;
  border: 4px solid tomato;
}
</style>
