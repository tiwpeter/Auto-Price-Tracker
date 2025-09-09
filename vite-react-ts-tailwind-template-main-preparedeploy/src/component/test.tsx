import { Dialog } from '@headlessui/react';

export default function Test() {
  return (
    <Dialog open={true} onClose={() => {}}>
      <Dialog.Panel>
        <Dialog.Title>Hello</Dialog.Title>
        <p>This is working!</p>
      </Dialog.Panel>
    </Dialog>
  );
}
