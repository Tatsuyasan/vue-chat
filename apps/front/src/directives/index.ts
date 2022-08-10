import { DirectiveBinding, ObjectDirective } from 'vue';

type FocusableElement = HTMLInputElement | HTMLTextAreaElement;
type NotificationCallback = (isNowFocused: boolean) => void;
type GenericEventHandler = () => void;
interface ExtendedDirective extends ObjectDirective {
  handleMouseenter: GenericEventHandler;
  handleMouseleave: GenericEventHandler;
}

export const vHoverChangeNotify = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleMouseenter: (() => {}) as GenericEventHandler,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleMouseleave: (() => {}) as GenericEventHandler,
  mounted(element: FocusableElement, binding: DirectiveBinding) {
    const callback = binding.value as NotificationCallback;
    const thisDirective = binding.dir as ExtendedDirective;
    thisDirective.handleMouseenter = () => {
      callback(true);
    };
    thisDirective.handleMouseleave = () => {
      callback(false);
    };
    element.addEventListener('mouseenter', thisDirective.handleMouseenter);
    element.addEventListener('mouseleave', thisDirective.handleMouseleave);
  },
  beforeUnmount(element: FocusableElement, binding: DirectiveBinding) {
    const thisDirective = binding.dir as ExtendedDirective;
    element.removeEventListener('mouseenter', thisDirective.handleMouseenter);
    element.removeEventListener('mouseleave', thisDirective.handleMouseleave);
  }
};
