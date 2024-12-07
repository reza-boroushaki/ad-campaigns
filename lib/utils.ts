import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertDate(milliseconds: string) {
  const date = new Date(milliseconds);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

export function convertDateToMilliseconds(value: Date) {
  const date = new Date(value);
  return date.getTime();
}

export function convertMillisecondsToDays(milliseconds: number) {
  const total_seconds = Math.floor(milliseconds / 1000);
  const total_minutes = Math.floor(total_seconds / 60);
  const total_hours = Math.floor(total_minutes / 60);
  return Math.floor(total_hours / 24);
}

export function encodeObject(obj: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, String(value)])
  );
}
