// src/setupTests.js
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
// Запускаем cleanup после каждого теста (например, для очистки DOM)
afterEach(() => {
  cleanup();
});