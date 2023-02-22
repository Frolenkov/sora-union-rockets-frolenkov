export function saveToStorage<T>(
  key: string,
  obj: T,
  remember?: boolean
): void {
  if (remember) {
    localStorage.setItem(key, JSON.stringify(obj));
    return;
  }
  sessionStorage.setItem(key, JSON.stringify(obj));
}

export function getFromStorage<T>(key: string): T {
  return (
    JSON.parse(<string>localStorage.getItem(key)) ??
    JSON.parse(<string>sessionStorage.getItem(key))
  );
}

export function removeFromStorage(key: string): void {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
}