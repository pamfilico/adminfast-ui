"use client";

import { createContext } from "react";
import type { AdminFastContextValue } from "./types";

export const AdminFastContext = createContext<AdminFastContextValue | null>(null);
