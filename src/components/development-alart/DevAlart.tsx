import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AlertDialogComponentProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const DevAlertDialogComponent: React.FC<AlertDialogComponentProps> = ({
  isOpen,
  onOpenChange,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Feature Under Development</AlertDialogTitle>
          <AlertDialogDescription>
            We are currently working hard to bring you this feature. Please stay
            tuned for updates and thank you for your patience.
            <br />
            <span className="flex justify-end items-center gap-2 my-3">
              <Image
                src="/assets/loaders/logo apparium.png"
                width={500}
                height={500}
                alt="Company Logo"
                className="w-6 h-6 object-cover object-center rounded-full border p-0.5"></Image>
              <strong className="my-3">- Team Apprium </strong>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => onOpenChange(false)}
            className={cn("bg-black text-white w-28 h-12")}>
            okay
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DevAlertDialogComponent;
