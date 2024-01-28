<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-slate-900/50 backdrop-filter backdrop-blur-sm transition-opacity"
      :class="{ 'opacity-100': isOpen, 'opacity-0': !isOpen }"
    ></div>

    <div class="fixed inset-0 overflow-y-auto modal-custom h-full">
      <div
        class="w-full transform rounded-md bg-white dark:bg-slate-800 text-left align-middle shadow-xl transition-all"
        :class="[sizeClass, centered ? 'mx-auto' : '']"
      >
        <div
          class="relative overflow-hidden py-4 px-5 text-white flex justify-between"
          :class="themeClass"
        >
          <h2
            v-if="title"
            class="capitalize leading-6 tracking-wider font-medium text-base text-white"
          >
            {{ title }}
          </h2>
          <button @click="closeModal" class="text-[22px]">&times;</button>
        </div>
        <div
          class="px-3 py-4"
          :class="scrollContent ? 'overflow-y-auto max-h-[400px]' : 'h-full'"
        >
          <slot />
        </div>
        <div
          class="px-4 py-3 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-700"
          v-if="$slots.footer"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import { getCurrentInstance } from "vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    Icon,
  },

  props: {
    labelClass: {
      type: String,
      default: "btn-primary",
    },
    centered: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Basic Modal",
    },
    label: {
      type: String,
      default: "Basic Modal",
    },
    disableBackdrop: {
      type: Boolean,
      default: false,
    },
    noFade: {
      type: Boolean,
      default: false,
    },
    themeClass: {
      type: String,
      default:
        "bg-slate-900 dark:bg-slate-800 dark:border-b dark:border-slate-700",
    },
    sizeClass: {
      type: String,
      default: "max-w-xl",
    },
    scrollContent: {
      type: Boolean,
      default: false,
    },
    activeModal: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const isOpen = ref(props.activeModal);
    const { emit } = getCurrentInstance();

    // open
    const openModal = () => {
      isOpen.value = !isOpen.value;
    };
    // close
    const closeModal = () => {
      isOpen.value = false;
      emit("closeModal", isOpen.value);
    };

    return { closeModal, openModal, isOpen };
  },
});
</script>

<style scoped>
.modal-custom {
  top: 52%;
  transform: translateY(-50%);
  margin: 0 5px;
}
</style>
