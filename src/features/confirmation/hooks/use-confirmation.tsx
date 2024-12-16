import { useContext } from 'react';
import { confirmationContext } from '../context/confirmation';

export const useConfirmation = () => {
  const context = useContext(confirmationContext);
  if (!context) throw new Error('Confirmation context is not injected');
  return context.confirm;
};
