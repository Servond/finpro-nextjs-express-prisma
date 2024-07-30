'use client';
import { Button } from '@/components/ui/button';
import { cancelTransaction, payTransaction } from '@/utils/actions/transaction';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CancelTicketButton({
  transaction_id,
  children,
}: {
  transaction_id?: number | null;
  children?: React.ReactNode;
}) {
  const router = useRouter();

  const handleCancel = async () => {
    try {
      const response = cancelTransaction(transaction_id as number);

      if (response) {
        toast.promise(response, {
          loading: 'Canceling ticket...',
          success: 'Ticket canceled',
          error: 'Failed to cancel ticket',
        });
      }

      await response;
    } catch (error) {
      toast.error('Failed to pay ticket');
    } finally {
      router.refresh();
    }
  };

  return (
    <Button
      onClick={handleCancel}
      className="
      bg-red-600
      hover:bg-red-700"
    >
      {children}
    </Button>
  );
}
