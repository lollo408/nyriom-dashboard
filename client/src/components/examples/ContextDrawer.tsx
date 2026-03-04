import { useState } from 'react';
import ContextDrawer from '../ContextDrawer';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

export default function ContextDrawerExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)} variant="outline" className="gap-2">
        <Info className="w-4 h-4" />
        Open Context
      </Button>
      <ContextDrawer open={open} onOpenChange={setOpen} />
    </div>
  );
}
