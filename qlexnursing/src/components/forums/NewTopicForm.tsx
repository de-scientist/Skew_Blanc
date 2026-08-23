"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/auth/LoginForm";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/icons";
import { forumTopics } from "@/data/mock/content";

export function NewTopicForm() {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState(forumTopics[0].category);
  const [body, setBody] = React.useState("");
  const [posted, setPosted] = React.useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setPosted(true);
    setTimeout(() => router.push("/forums"), 800);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Title" htmlFor="title">
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="input" placeholder="Ask a clear, specific question" />
      </Field>
      <Field label="Category" htmlFor="category">
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="input">
          {Array.from(new Set(forumTopics.map((t) => t.category))).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Field>
      <Field label="Details" htmlFor="body">
          <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} rows={6} className="input-area" placeholder="Add context so others can help" />
      </Field>
      <div className="flex items-center gap-3">
        <Button type="submit">
          Post topic
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
        {posted && (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-success-600">
            <CheckIcon className="h-4 w-4" /> Posted (demo)
          </span>
        )}
      </div>
    </form>
  );
}
