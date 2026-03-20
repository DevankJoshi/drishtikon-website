# Wave Background Integration Guide

## Overview

The DRISHTIKON website now features a seamless animated wave background that spans across all pages, creating a unified visual experience. The waves are interactive, responding to mouse movement and touch gestures, using your brand's orange and blue theme colors.

## Components Created

### 1. **wave-background.tsx** (`src/components/ui/wave-background.tsx`)
The core Waves component that renders the interactive SVG animation.

**Key Features:**
- Simplex noise-based procedural wave generation
- Interactive mouse/touch following behavior
- Smooth wave animations using requestAnimationFrame
- Responsive sizing to fill container
- Customizable colors and pointer size

**Props:**
```typescript
interface WavesProps {
    className?: string
    strokeColor?: string              // Default: #d28723 (brand-orange)
    backgroundColor?: string          // Default: #0a0a0a (brand-dark)
    pointerSize?: number              // Default: 0.5rem
}
```

**Usage:**
```tsx
<Waves
    strokeColor="#d28723"
    backgroundColor="#0a0a0a"
    pointerSize={0.5}
/>
```

### 2. **seamless-waves-layout.tsx** (`src/components/ui/seamless-waves-layout.tsx`)
Wrapper component that applies the wave background globally while keeping content scrollable.

**Key Features:**
- Fixed wave background behind all content
- Content layer scrolls independently (z-index: 10)
- Hydration-safe (uses useState to prevent SSR issues)
- Seamless integration with all sections

**Usage in Layout:**
```tsx
<SeamlessWavesLayout>
    {children}
</SeamlessWavesLayout>
```

## Integration Changes

### 1. **app/layout.tsx**
- Added `SeamlessWavesLayout` wrapper
- Updated body className to use `bg-brand-dark`
- Added `overflow-x-hidden` to prevent horizontal scroll

### 2. **app/page.tsx** (Hero Section)
- Removed static gradient wave elements
- Let the dynamic wave background show through
- Content remains in z-10 layer above waves

### 3. **Component Backgrounds**
Made all sections transparent to allow wave background to show:

| Component | Before | After |
|-----------|--------|-------|
| StorySection | `bg-black` | `bg-transparent` |
| TracklistSection | `bg-[#050505]` | `bg-transparent` |
| PlayerSection | `bg-[#0a0a0a]` | `bg-transparent` |
| MerchSection | `bg-black` | `bg-transparent` |

### 4. **Dependencies**
Added new npm package:
```bash
npm install simplex-noise
```

## Color Theme

The waves use your existing brand colors:

```css
--color-brand-orange: #d28723;    /* Wave lines */
--color-brand-blue: #0055ff;      /* Not used in waves but available */
--color-brand-dark: #0a0a0a;      /* Background */
```

**Customization:**
To change wave colors, modify the props in `seamless-waves-layout.tsx`:
```tsx
<Waves
    strokeColor="#your-color"
    backgroundColor="#your-bg"
/>
```

## Mobile Experience

The wave background is fully responsive and mobile-optimized:

✅ **Seamless Scrolling:** No disconnections between sections on mobile
✅ **Touch Interaction:** Waves respond to touch movements
✅ **Performance:** Uses requestAnimationFrame for smooth 60fps animation
✅ **One Page Feel:** All sections feel like a single continuous page

### Mobile Optimization Details:
- Touch event listeners with `passive: false` for preventDefault
- Responsive SVG sizing (`width: 100%`, `height: 100%`)
- Fixed background doesn't scroll with content
- Content layer scrolls smoothly over fixed waves

## Performance Considerations

### Optimization Techniques:
1. **requestAnimationFrame:** Synced with browser refresh rate
2. **CSS Containment:** Each section is independently positioned
3. **Fixed Background:** Only one animation loop (waves)
4. **Throttled Resize:** Updates only on window resize
5. **Passive Touch Listeners:** Non-blocking scroll performance

### Browser Support:
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Touch-optimized

## Customization Guide

### Change Wave Speed
In `wave-background.tsx`, modify `movePoints()`:
```typescript
const move = noise(
    (p.x + time * 0.008) * 0.003,  // ← Change multiplier
    (p.y + time * 0.003) * 0.002
) * 8
```

### Adjust Wave Amplitude
Modify the wave calculations:
```typescript
p.wave.x = Math.cos(move) * 12    // ← Increase for larger waves
p.wave.y = Math.sin(move) * 6     // ← Adjust vertical amplitude
```

### Change Mouse Interaction Distance
Modify the interaction radius:
```typescript
const l = Math.max(175, mouse.vs)  // ← Increase for larger interaction area
```

### Adjust Pointer Size
Pass different `pointerSize` prop:
```tsx
<Waves pointerSize={1.0} />  // Larger pointer indicator
```

## Troubleshooting

### Waves Not Showing
1. Check z-index: Background should be `z-0`, content `z-10`
2. Verify `SeamlessWavesLayout` wraps all content in layout.tsx
3. Ensure sections have `bg-transparent` (not `bg-black`)

### Performance Issues
1. Reduce line spacing in `setLines()`: Change `xGap` and `yGap`
2. Decrease `totalLines` calculation
3. Check browser DevTools for CPU usage

### Mobile Issues
1. Check touch event listeners are properly attached
2. Verify viewport meta tag in head
3. Test on actual device (not browser emulator)

### Color Not Showing
1. Verify `strokeColor` prop is valid hex color
2. Check SVG stroke-width (currently "1")
3. Ensure `backgroundColor` is darker than stroke color

## Best Practices

### DO ✅
- Keep all sections with `bg-transparent`
- Use relative z-index positioning for sections
- Add border separators between sections for visual clarity
- Test on mobile devices during development

### DON'T ❌
- Add `bg-black` or other background colors to sections
- Use absolute positioning that breaks layout flow
- Set z-index values in sections (they should use default stacking)
- Modify the wave component without testing performance

## Browser DevTools Tips

### Performance Monitoring:
```javascript
// Check animation frame rate
performance.mark('wave-start');
// ... animation
performance.mark('wave-end');
performance.measure('wave-frame', 'wave-start', 'wave-end');
```

### Debug Wave Colors:
```javascript
// In browser console:
document.querySelector('svg path').setAttribute('stroke', '#ff0000');
```

### Check Responsive Behavior:
```javascript
// See container size
console.log(containerRef.current.getBoundingClientRect());
```

## Deployment Notes

✅ Vercel automatically deploys changes on git push
✅ Wave animation will start immediately on page load
✅ No additional environment variables needed
✅ All functionality works on Vercel's serverless platform

## Future Enhancements

Potential improvements for future versions:
- [ ] Add color animation (waves fade between orange and blue)
- [ ] Implement section-specific wave colors
- [ ] Add pause/resume controls
- [ ] Implement WebGL version for better performance
- [ ] Add audio-reactive wave effects (sync with music)

## Support & Questions

For issues or customizations:
1. Check console for JavaScript errors
2. Verify all dependencies installed: `npm install simplex-noise`
3. Rebuild if needed: `npm run build`
4. Clear `.next` cache if styles not updating: `rm -rf .next`

---

**Last Updated:** March 21, 2026
**Version:** 1.0
**Status:** ✅ Live on Vercel
