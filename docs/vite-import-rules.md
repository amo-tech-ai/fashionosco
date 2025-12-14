
# Vite Import Rules & Verification

## 1. Allowed Patterns

### Relative Imports (Standard)
Use for files within the same module or nearby directories.
```tsx
import { Button } from '../components/Button';
import { Layout } from './layouts/Layout';
```

### Alias Imports (Configuration Required)
Use `@/` to reference the `src/` root. This requires configuration in both `vite.config.ts` and `tsconfig.json`.
```tsx
import { Home } from '@/pages/Home';
import { useAuth } from '@/contexts/AuthContext';
```

## 2. Configuration Setup

### vite.config.ts
```typescript
import path from 'path';
// ...
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
},
```

### tsconfig.json (Required for TypeScript support)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 3. Troubleshooting
If you see `Failed to resolve module specifier`, run these commands to find the culprit:

```bash
# Find usages of @/ imports
grep -R "@/pages" -n .
grep -R "import.*@/" -n .

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```
