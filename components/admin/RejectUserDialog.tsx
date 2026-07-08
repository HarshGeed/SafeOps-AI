"use client";

import { useState, useTransition } from "react";

import { rejectUser } from "@/actions/admin/reject-user";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

type Props = {
  profileId: string;
};

export function RejectUserDialog({
  profileId,
}: Props) {
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const handleReject = () => {
    startTransition(async () => {
      try {
        await rejectUser(profileId);
        setOpen(false);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
        >
          Reject
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Reject User?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will reject the users registration.
            They will not be able to log in unless an
            administrator approves them later.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={handleReject}
          >
            {isPending
              ? "Rejecting..."
              : "Reject User"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}