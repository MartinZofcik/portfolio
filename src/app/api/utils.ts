import { redirect } from 'next/navigation';

export const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Something went wrong';
  }
  return message;
};

export const handleActionResponse = (
  response: {
    status: string;
    message?: string;
    messageId?: string;
  },
  t?: any,
  toast?: any,
  toggleModal?: any,
) => {
  if (toggleModal) {
    toggleModal({ isOpen: false, content: undefined });
  }
  if (toast) {
    if (response.status === 'success') {
      toast({
        variant: 'default',
        title: t('form.status.success.title'),
        description: response.messageId
          ? t(response.messageId)
          : response.message ?? '',
        duration: 2000,
      });
    }
    if (response.status === 'error') {
      toast({
        variant: 'destructive',
        title: t('form.status.error.title'),
        description: response.messageId
          ? t(response.messageId)
          : response.message ?? '',
        duration: 5000,
      });
    }
    if (response.status === 'unauthorized') {
      toast({
        variant: 'destructive',
        title: t('form.status.unauthorized.title'),
        description: t('form.status.unauthorized.description'),
        duration: 2000,
      });
      redirect('/api/auth/signin');
    }
  }
};
