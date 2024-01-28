<template>
  <div>
    <label
      class="flex items-start"
      :class="disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'"
    >
      <input
        type="checkbox"
        class="hidden"
        :disabled="disabled"
        :name="name"
        @change="onChange"
        :value="value"
        v-model="localValue"
        v-bind="$attrs"
      />
      <div
        :class="ck ? activeClass : 'bg-secondary-500'"
        class="relative inline-flex h-6 w-[46px] mr-3 items-center rounded-full transition-all duration-150"
      >
        <span
          v-if="badge && ck"
          :class="icon ? 'text-sm' : 'text-[9px]'"
          class="absolute left-1 top-1/2 -translate-y-1/2 capitalize font-bold text-white tracking-[1px]"
        >
          <span v-if="!icon">on</span>
          <Icon v-if="icon" :icon="prevIcon" />
        </span>
        <span
          v-if="badge && !ck"
          :class="icon ? 'text-sm' : 'text-[9px]'"
          class="absolute right-1 top-1/2 -translate-y-1/2 capitalize font-bold text-slate-900 tracking-[1px]"
        >
          <span v-if="!icon">off</span>
          <Icon v-if="icon" :icon="nextIcon" />
        </span>
        <span
          :class="ck ? 'translate-x-6' : 'translate-x-[2px]'"
          class="inline-block h-5 w-5 transform rounded-full bg-white transition-all duration-150"
        />
      </div>
      <span
        class="text-slate-500 dark:text-slate-400 text-sm leading-6"
        v-if="label"
      >
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "Checkbox",
  inheritAttrs: false,
  components: {
    Icon,
  },
  props: {
    label: String,
    active: Boolean,
    disabled: Boolean,
    name: String,
    activeClass: {
      type: String,
      default: "bg-slate-900 dark:bg-slate-900",
    },
    value: null,
    modelValue: null,
    badge: Boolean,
    icon: Boolean,
    prevIcon: {
      type: String,
      default: "heroicons-outline:volume-up",
    },
    nextIcon: {
      type: String,
      default: "heroicons-outline:volume-off",
    },
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const ck = ref(props.active);

    const onChange = () => {
      ck.value = !ck.value;
      context.emit("update:modelValue", ck.value);
    };

    const localValue = computed({
      get: () => props.modelValue,
      set: (newValue) => context.emit("update:modelValue", newValue),
    });

    return { localValue, ck, onChange };
  },
});
</script>

<style lang=""></style>
