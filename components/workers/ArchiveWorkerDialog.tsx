"use client";

import { useState, useTransition } from "react";

import { archiveWorker } from "@/actions/workers/archive-worker";

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

export function ArchiveWorkerDialog({
  workerId,
}: {
  workerId: string;
}) {
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] =
    useTransition();

  function handleArchive() {
    startTransition(async () => {
      try {
        await archiveWorker(workerId);

        setOpen(false);
      } catch (error) {
        console.error(error);
      }
    });
  }

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
          Archive
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Archive Worker?
          </AlertDialogTitle>

          <AlertDialogDescription>
            The worker will no longer appear
            in the active workers list.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={handleArchive}
          >
            {isPending
              ? "Archiving..."
              : "Archive"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}