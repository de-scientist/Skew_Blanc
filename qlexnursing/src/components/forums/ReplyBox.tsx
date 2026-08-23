"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/icons";

export function ReplyBox({ topic }: { topic: string }) {
  const [text, setText] = React.useState("");
  const [posted, setPosted] = React.useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setPosted(true);
    setText("");
  }

  return (
    <Card>
      <CardContent>
        <p className="text-sm font-semibold text-ink">Join the discussion</p>
      {posted ? (
        <p className="mt-3 flex items-center gap-2 rounded-xl bg-success-50 px-3 py-2 text-sm text-success-700 dark:bg-success-900/20">
          <CheckIcon className="h-4 w-4" /> Thanks! Your reply was posted (demo).
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-3 space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder={`Share your thoughts on “${topic}”…`}
            className="w-full rounded-xl border border-line bg-canvas p-3 text-sm text-ink placeholder:text-muted focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <Button type="submit" size="sm">
            Post reply
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </form>
      )}
      </CardContent>
    </Card>
  );
}
