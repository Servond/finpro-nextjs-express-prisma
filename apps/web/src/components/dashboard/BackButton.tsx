'use client';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function BackButton() {
  let router = useRouter();
  return (
    <div className="flex items-center h-14 p-4">
      <Button
        onClick={() => router.back()}
        variant={'secondary'}
        className="inline-flex h-8 items-center rounded-md px-3 text-sm font-medium shadow transition-colors focus:outline-none"
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back
      </Button>
    </div>
  );
}
