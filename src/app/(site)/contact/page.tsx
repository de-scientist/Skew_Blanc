import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea, Select } from "@/components/ui/form";
import { MailIcon, PhoneIcon, MapPinIcon, CheckIcon, SendIcon } from "@/components/ui/icons";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: "Get in touch with the Nursora team for support, partnerships or feedback.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Contact us</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Questions, feedback or partnership ideas? Send a message and we&apos;ll reply
            within two business days.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {[
              { icon: <MailIcon className="h-5 w-5" />, label: "Email", value: "support@nursora.com" },
              { icon: <PhoneIcon className="h-5 w-5" />, label: "Phone", value: "+1 (555) 014-2278" },
              { icon: <MapPinIcon className="h-5 w-5" />, label: "Office", value: "Skew Blanc LTD · Remote-first team" },
            ].map((c) => (
              <Card key={c.label}>
                <CardContent className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">{c.icon}</span>
                  <div>
                    <p className="text-xs text-muted">{c.label}</p>
                    <p className="text-sm font-semibold text-ink">{c.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="rounded-2xl bg-brand-50 p-4 text-sm text-brand-800 dark:bg-brand-900/30 dark:text-brand-200">
              <CheckIcon className="mr-1 inline h-4 w-4" />
              Demo mode: the form is for show. Submissions aren&apos;t stored.
            </div>
          </div>

          <Card>
            <CardContent>
              <form className="space-y-4" action="/contact" method="get">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Name" htmlFor="name">
                    <Input id="name" name="name" required placeholder="Your name" />
                  </Field>
                  <Field label="Email" htmlFor="email">
                    <Input id="email" name="email" type="email" required placeholder="you@email.com" />
                  </Field>
                </div>
                <Field label="Phone" htmlFor="phone">
                  <Input id="phone" name="phone" placeholder="+1 (555) 000-0000" />
                </Field>
                <Field label="Category" htmlFor="category">
                  <Select id="category" name="category" defaultValue="General Support">
                    <option>General Support</option>
                    <option>Technical Support</option>
                    <option>Exam Support</option>
                    <option>Account</option>
                    <option>Subscription</option>
                    <option>Other</option>
                  </Select>
                </Field>
                <Field label="Message" htmlFor="message">
                  <Textarea id="message" name="message" required rows={5} placeholder="How can we help?" />
                </Field>
                <Button type="submit" size="lg" className="w-full">
                  <SendIcon className="h-4 w-4" /> Send message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
