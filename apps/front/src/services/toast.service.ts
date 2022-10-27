import { ref } from 'vue';
import { nanoid } from 'nanoid';
import { isString } from '@/utils/assertions';

type Toast = {
  id: string;
  timeout: number;
  message: string;
  type: string;
};

type ToastDto = Partial<Toast>;

const toasts = ref<Toast[]>([]);
const timeout = 5000;

const addToast = (toast: any) => {
  if (isString(toast)) {
    toast = { message: toast };
  }

  const normalizedToast: Toast = {
    id: nanoid(4),
    timeout,
    ...toast
  };

  toasts.value.push(normalizedToast);

  setTimeout(() => {
    const index = toasts.value.indexOf(normalizedToast);
    if (index === -1) return;
    toasts.value.splice(index, 1);
  }, timeout);

  return normalizedToast;
};

export const toastService = {
  show: (toast: ToastDto, type: string) => {
    if (isString(toast)) {
      toast = { message: toast };
    }

    return addToast({ ...toast, type: toast.type || type });
  },

  showSuccess: (toast: Toast) => {
    return toastService.show(toast, 'success');
  },

  showWarning: (toast: Toast) => {
    return toastService.show(toast, 'warning');
  },

  showError: (toast: Toast) => {
    return toastService.show(toast, 'error');
  },

  hide: (toastId: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== toastId);
  }
};
