"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { InquiryDialog } from "./inquiry-dialog";

export type InquiryPrefill = { site?: string; email?: string };

type InquiryApi = { open: (prefill?: InquiryPrefill) => void };

const InquiryContext = createContext<InquiryApi | null>(null);

/** Mounted once in the root layout: any page can open the inquiry popup with `useInquiry()` or `<InquiryTrigger>`. */
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

/** A button that opens the inquiry popup. Pass the same classes you would give a link. */
export function InquiryTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  const { open } = useInquiry();
  return (
    <button type="button" onClick={() => open()} aria-haspopup="dialog" className={className}>
      {children}
    </button>
  );
}
