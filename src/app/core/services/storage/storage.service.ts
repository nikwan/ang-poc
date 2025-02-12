import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage: Storage;
  constructor() {
    this.storage = sessionStorage;
  }

  get length(): number {
    return this.storage.length;
  }

  get<T = string>(key: string): T | string | undefined {
    const data = this.storage.getItem(key);
    if (!data) {
      return undefined;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }

  set<T>(key: string, value: T): void {
    if (typeof value !== 'string') {
      const data = JSON.stringify(value);
      return this.storage.setItem(key, data);
    }
    return this.storage.setItem(key, value);
  }

  del(key: string): void {
    return this.storage.removeItem(key);
  }

  clear(): void {
    return this.storage.clear();
  }
}
