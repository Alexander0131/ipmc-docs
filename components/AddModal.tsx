"use client";
import { Dialog, DialogContent } from "./ui/dialog";
import { addModalType } from "@/types/global";

const AddModal = ({
  isOpen,
  onClose,
  children,
}: addModalType) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          
          {children}
          
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
