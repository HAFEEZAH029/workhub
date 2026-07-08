"use client";

import { useSyncExternalStore } from "react";
import { getOAuthErrorMessage } from "@/lib/auth/oauth-error";

function subscribeToUrlChange(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  window.addEventListener("popstate", onStoreChange);

  return () => {
    window.removeEventListener("hashchange", onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
  };
}

function getUrlSnapshot() {
  return `${window.location.search}${window.location.hash}`;
}

function getServerUrlSnapshot() {
  return "";
}

export function useOAuthErrorMessage(oauthError?: string) {
  const url = useSyncExternalStore(
    subscribeToUrlChange,
    getUrlSnapshot,
    getServerUrlSnapshot,
  );
  const [search = "", hash = ""] = url.split("#", 2);

  const queryMessage = getOAuthErrorMessage(new URLSearchParams(search));
  const hashMessage = getOAuthErrorMessage(new URLSearchParams(hash));

  return oauthError ?? queryMessage ?? hashMessage;
}
