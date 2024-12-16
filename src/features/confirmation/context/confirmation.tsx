'use client';

import { createContext, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import { type ConfirmationParams } from '../types';
import { defaultConfirmationParams } from '../constants/params';

export const confirmationContext = createContext<{
  confirm: (params?: Partial<ConfirmationParams>) => Promise<boolean>;
} | null>(null);

export const ConfirmationProvider = ({ children }: { children: ReactNode }) => {
  const [params, setParams] = useState<ConfirmationParams | null>(null);
  const [showModal, setShowModal] = useState(false);

  const confirm = async (
    params?: Partial<ConfirmationParams>
  ): Promise<boolean> => {
    setShowModal(true);

    return new Promise((resolve) => {
      setParams({
        ...defaultConfirmationParams,
        ...params,
        onClose: () => {
          resolve(false);
          setShowModal(false);
          setTimeout(() => setParams(null), 200);
        },
        onConfirm: () => {
          resolve(true);
          setShowModal(false);
          setTimeout(() => setParams(null), 200);
        },
      });
    });
  };

  return (
    <confirmationContext.Provider value={{ confirm }}>
      {children}
      <Dialog open={showModal}>
        <DialogContent showCloseIcon={false}>
          <DialogHeader>
            <DialogTitle>{params?.title}</DialogTitle>
            <DialogDescription>{params?.message}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={params?.onClose} variant='secondary'>
              {params?.cancelText}
            </Button>
            <Button onClick={params?.onConfirm} variant='destructive'>
              {params?.confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </confirmationContext.Provider>
  );
};
