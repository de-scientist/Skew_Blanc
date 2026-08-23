"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Card, CardContent } from "@/components/ui/Card";
import { Field, Input, Select } from "@/components/ui/form";
import { CheckIcon, ArrowRightIcon, UserIcon, MailIcon, PhoneIcon, GraduationIcon, UploadIcon } from "@/components/ui/icons";
import type { NursingPath } from "@/types/domain";

export function ProfileEditForm() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();
  const [saved, setSaved] = React.useState(false);
  const [photo, setPhoto] = React.useState<string | undefined>(user?.avatarUrl);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [form, setForm] = React.useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    nursingLevel: (user?.nursingLevel ?? "RN") as NursingPath,
    institution: user?.institution ?? "",
    studyGoal: user?.studyGoal ?? "",
    preferredLanguage: user?.preferredLanguage ?? "English",
    timezone: user?.timezone ?? "America/New_York",
  });

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  };

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string);
      setSaved(false);
    };
    reader.readAsDataURL(file);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await updateProfile({ ...form, avatarUrl: photo });
    setSaved(true);
    setTimeout(() => router.push("/profile"), 700);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Card>
        <CardContent className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Avatar
            name={`${form.firstName} ${form.lastName}`}
            src={photo}
            className="h-16 w-16 text-xl"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">Profile photo</p>
            <p className="text-xs text-muted">
              JPG or PNG. Saved locally for this demo.
            </p>
          </div>
          <div className="flex w-full gap-2 sm:ml-auto sm:w-auto">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onPickFile}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={() => fileRef.current?.click()}
            >
              <UploadIcon className="h-4 w-4" /> Replace
            </Button>
            {photo && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="flex-1 sm:flex-none"
                onClick={() => setPhoto(undefined)}
              >
                Remove
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="First name" htmlFor="firstName">
          <Input
            id="firstName"
            value={form.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            leftIcon={<UserIcon className="h-4 w-4" />}
          />
        </Field>
        <Field label="Last name" htmlFor="lastName">
          <Input
            id="lastName"
            value={form.lastName}
            onChange={(e) => set("lastName", e.target.value)}
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            leftIcon={<MailIcon className="h-4 w-4" />}
          />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            leftIcon={<PhoneIcon className="h-4 w-4" />}
          />
        </Field>
        <Field label="Nursing level" htmlFor="nursingLevel">
          <Select
            id="nursingLevel"
            value={form.nursingLevel}
            onChange={(e) => set("nursingLevel", e.target.value)}
            leftIcon={<GraduationIcon className="h-4 w-4" />}
          >
            <option value="RN">RN</option>
            <option value="LPN">LPN</option>
            <option value="Pre-Nursing">Pre-Nursing</option>
            <option value="Other">Other</option>
          </Select>
        </Field>
        <Field label="Institution" htmlFor="institution">
          <Input
            id="institution"
            value={form.institution}
            onChange={(e) => set("institution", e.target.value)}
            placeholder="School of Nursing"
          />
        </Field>
      </div>

      <Field label="Study goal" htmlFor="studyGoal">
        <Input
          id="studyGoal"
          value={form.studyGoal}
          onChange={(e) => set("studyGoal", e.target.value)}
          placeholder="Answer 40 questions on weekdays"
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Preferred language" htmlFor="lang">
          <Select
            id="lang"
            value={form.preferredLanguage}
            onChange={(e) => set("preferredLanguage", e.target.value)}
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </Select>
        </Field>
        <Field label="Timezone" htmlFor="tz">
          <Select
            id="tz"
            value={form.timezone}
            onChange={(e) => set("timezone", e.target.value)}
          >
            <option>America/New_York</option>
            <option>America/Chicago</option>
            <option>America/Denver</option>
            <option>America/Los_Angeles</option>
          </Select>
        </Field>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit">
          Save changes
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
        {saved && (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-success-600">
            <CheckIcon className="h-4 w-4" /> Saved
          </span>
        )}
      </div>
    </form>
  );
}
