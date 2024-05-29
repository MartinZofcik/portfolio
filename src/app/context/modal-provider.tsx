import React, { createContext } from 'react';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

export interface IModalData {
  isOpen: boolean;
  title?: string | React.ReactElement;
  content?: React.ReactElement;
  // variant?: 'permanent' | 'persistent' | 'temporary';
  // onClose?: () => void;
}

interface IModalContext {
  toggleModal: (modalData: IModalData) => void;
}
export const ModalContext = createContext<IModalContext>({} as IModalContext);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalData, toggleModal] = React.useState<IModalData>({
    isOpen: false,
  });

  return (
    <ModalContext.Provider value={{ toggleModal }}>
      {children}
      <Dialog
        open={Boolean(modalData?.isOpen)}
        onOpenChange={() => toggleModal({ isOpen: false, content: undefined })}
      >
        {/*<DialogOverlay />*/}
        <DialogContent>
          {modalData?.title && (
            <DialogTitle className="mb-2">{modalData?.title}</DialogTitle>
          )}
          {modalData?.content}
          {/*<DialogDescription></DialogDescription>*/}
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
};
