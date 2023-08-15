import { onMounted, onDeactivated, onActivated, onUnmounted, onUpdated, onBeforeMount, onBeforeUpdate, onBeforeUnmount, onErrorCaptured } from 'vue'
type life = 'Mounted' | 'Unmounted' | 'Updated' | 'BeforeMount' | 'BeforeUpdate' | 'BeforeUnmount' | 'ErrorCaptured' | 'Activated' | 'Deactivated'
export const life_cycle = (type: life, handle: () => void) => {
  switch (type) {
    case 'Activated':
      onActivated(handle)
      break;
    case 'Deactivated':
      onDeactivated(handle)
      break;
    case 'Mounted':
      onMounted(handle)
      break;
    case 'Unmounted':
      onUnmounted(handle)
      break;
    case 'Updated':
      onUpdated(handle)
      break;
    case 'BeforeMount':
      onBeforeMount(handle)
      break;
    case 'BeforeUpdate':
      onBeforeUpdate(handle)
      break;
    case 'BeforeUnmount':
      onBeforeUnmount(handle)
      break;
    case 'ErrorCaptured':
      onErrorCaptured(handle)
      break;
    default:
      throw new Error()
  }
}