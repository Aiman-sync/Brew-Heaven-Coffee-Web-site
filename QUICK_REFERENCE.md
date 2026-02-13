# ☕ QUICK REFERENCE CARD

## Image Locations
```
Product Images:     src/data/products.ts (image URL)
Avatar Images:      src/contexts/AuthContext.tsx (avatar URL)
Background Images:  src/pages/Home.tsx (backgroundImage)
Local Images:       public/images/* (if needed)
Error Fallback:     src/components/ImageWithFallback.tsx
```

## Common Commands
```bash
# Development
npm run dev              # Start dev server (localhost:5173)
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Check for errors

# Deployment
npm run deploy          # Deploy to GitHub Pages
netlify deploy --prod   # Deploy to Netlify
vercel --prod          # Deploy to Vercel

# Maintenance
npm install            # Install dependencies
npm update            # Update packages
npm audit fix         # Fix security issues
```

## File Quick Links
```
Main App:          src/App.tsx
Home Page:         src/pages/Home.tsx
Menu Page:         src/pages/Menu.tsx
Products Data:     src/data/products.ts
Image Component:   src/components/ImageWithFallback.tsx
Styles:            src/index.css
Config:            vite.config.ts
```

## Update Product Price
**File:** `src/data/products.ts`
```typescript
{
  _id: '1',
  name: 'Classic Espresso',
  price: 3.50,  // ← Change this number
}
```

## Add New Product
**File:** `src/data/products.ts`
```typescript
{
  _id: '20',
  name: 'Your Coffee Name',
  description: 'Your description',
  price: 4.50,
  category: 'hot-coffee',  // or 'cold-coffee', 'pastries', etc
  image: 'https://cdn.url/image.jpg',  // or '/images/products/name.jpg'
  ingredients: ['Ingredient 1', 'Ingredient 2'],
  sizes: [
    { name: 'Small', price: 4.50, volume: '12oz' },
    { name: 'Medium', price: 5.50, volume: '16oz' },
  ],
  countInStock: 50,
  isAvailable: true,
  isFeatured: false,  // Set true to show on home page
  preparationTime: 5,
  tags: ['tag1', 'tag2'],
  rating: 4.8,
  numReviews: 100,
}
```

## Switch Image to Local File
1. Add image to: `public/images/products/filename.jpg`
2. Update URL in `src/data/products.ts`:
   ```typescript
   // From: 'https://cdn...'
   // To:   '/images/products/filename.jpg'
   image: '/images/products/espresso.jpg'
   ```

## Change Logo/Branding Colors
**File:** `src/index.css`
```css
:root {
  --coffee-dark: #3E2723;      /* Main dark color */
  --coffee-gold: #C6A75E;      /* Accent color */
  --coffee-light: #F5E6D3;     /* Light color */
}
```

## Enable/Disable Product
**File:** `src/data/products.ts`
```typescript
isAvailable: true,   // Set to false to disable
isFeatured: true,    // Set to true to show on home
```

## View All Documents
- `AUDIT_SUMMARY.md` - Overview of what was fixed
- `IMAGE_AUDIT_REPORT.md` - Detailed image inventory
- `DEPLOYMENT_GUIDE.md` - How to deploy to any platform
- `MAINTENANCE_GUIDE.md` - How to maintain the site
- `public/README.md` - How to add local images

## Project URLs
- **Dev:** http://localhost:5173
- **Dev Menu:** http://localhost:5173/menu
- **Dev Admin:** http://localhost:5173/admin
- **Build Folder:** dist/ (ready to deploy)

## Deployment Checklist
- [ ] `npm run build` completes without errors
- [ ] `npm run preview` shows correct site
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] No console errors (F12)
- [ ] Mobile responsive (Ctrl+Shift+M)
- [ ] Run deployment command
- [ ] Test on live URL

## Emergency: Revert Changes
```bash
git status              # See what changed
git checkout -- .      # Revert all changes
git log --oneline      # See commit history
git revert [commit]    # Undo specific commit
```

## Performance Check (Browser)
1. Open DevTools (F12)
2. Network tab → Reload page
3. Under "img" type → Check load times
4. All should be < 500ms
5. All should show "200" status

## Test Fallback (Simulate Error)
1. Open DevTools (F12)
2. Go to Network tab
3. Throttle to "Offline"
4. Reload page
5. Images should show coffee placeholder

## Stack Overview
```
React 18                 - UI Framework
Vite 5                   - Build tool
TypeScript               - Type safety
Tailwind CSS             - Styling
Framer Motion            - Animations
React Router             - Navigation
Sonner                   - Toast notifications
zustand / Context API    - State management
Shadcn UI              - Component library
Lucide React            - Icons
```

## Important Paths (Vite)
- Relative to base (./) ✅ Use this
- Absolute from src/    ✅ Use this  
- Relative ../../../    ❌ Avoid this
- file:// protocol      ❌ Avoid this

## Image URL Formats
```
✅ https://example.com/image.jpg
✅ /images/products/espresso.jpg
✅ data:image/svg+xml,...
❌ ../images/image.jpg
❌ ./images/image.jpg
❌ C:\path\to\image.jpg
```

## Module Imports
```typescript
// ✅ Correct
import Product from '@/pages/Product'
import { cn } from '@/lib/utils'

// ❌ Wrong
import Product from '../pages/Product'
import { cn } from '../../lib/utils'
```

## React Patterns Used
- Hooks (useState, useEffect, useContext, useRef)
- Custom Hooks (useCart, useAuth)
- Context API (AuthContext, CartContext)
- Function Components (not class components)
- TypeScript Interfaces for type safety

## Debugging Steps
1. Check browser console (F12)
2. Look for red error messages
3. Check Network tab for failed requests
4. Verify file exists in correct location
5. Check file name capitalization
6. Review browser console for CORS errors

## Git Workflow
```bash
git status           # See changes
git add .            # Stage changes
git commit -m "msg"  # Commit
git push             # Push to GitHub
git pull             # Pull updates
```

## Node Version Check
```bash
node --version       # Should be v18+
npm --version        # Should be 8+
```

---

**🍵 ProTip:** Save this file for quick reference while developing!

---

Last Updated: February 13, 2026
