"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { InquiryDialog } from "./inquiry-dialog";

/** What the popup starts with: values typed in the Start section, and which field to put the cursor in. */
export type InquiryPrefill = { site?: string; email?: string; focus?: "site" | "email" };

type InquiryApi = { open: (prefill?: InquiryPrefill) => void };

const InquiryContext = createContext<InquiryApi | null>(null);

/** Mounted once in the root layout: any page can open the inquiry popup with `useInquiry()`. */
export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ open: boolean; prefill: InquiryPrefill }>({ open: false, prefill: {} });
  const open = useCallback((prefill: InquiryPrefill = {}) => setState({ open: true, prefill }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const api = useMemo<InquiryApi>(() => ({ open }), [open]);

  return (
    <InquiryContext value={api}>
      {children}
      <InquiryDialog open={state.open} prefill={state.prefill} onClose={close} />
    </InquiryContext>
  );
}

export function useInquiry(): InquiryApi {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiry must be used inside <InquiryProvider>");
  return ctx;
}
