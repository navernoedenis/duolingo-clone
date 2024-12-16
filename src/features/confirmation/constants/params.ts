import { type ConfirmationParams } from '../types';

export const defaultConfirmationParams: ConfirmationParams = {
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  message: 'Are you sure?',
  onClose: () => {},
  onConfirm: () => {},
  title: 'Confirmation',
};
