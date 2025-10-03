# 🎨 Quick Color Reference Guide

## Copy-Paste Color Values

### Primary Colors
```css
/* Primary Blue - Main Actions */
#4A90E2  /* Buttons, links, highlights */
#3A7BC8  /* Hover state */

/* Secondary Teal - Friendly Accents */
#50E3C2  /* Headers, icons, success states */
#3DCFB0  /* Hover state */

/* Accent Orange - Alerts & Attention */
#F5A623  /* Warnings, notifications, delete */
#E09515  /* Hover state */
```

### Backgrounds
```css
#F7F7F7  /* Main page background */
#FFFFFF  /* Cards, containers, forms */
#E0E0E0  /* Borders and dividers */
```

### Text
```css
#333333  /* Primary text (headings, body) */
#666666  /* Secondary text (subtitles, muted) */
```

## Gradient Combinations

### Blue-Teal Gradient (Hero, Navbar, Quote)
```css
background: linear-gradient(135deg, #4A90E2 0%, #50E3C2 100%);
```

### Light Backgrounds
```css
/* Blue tint */
background: #E8F5FF;

/* Teal tint */
background: #E8FFF9;

/* Orange tint */
background: #FFF9F0;

/* Lavender tint */
background: #F5F3F5;
```

## Shadow Presets

```css
/* Card Shadow */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

/* Hover Shadow - Blue */
box-shadow: 0 6px 16px rgba(74, 144, 226, 0.15);

/* Button Shadow - Blue */
box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);

/* Button Shadow - Teal */
box-shadow: 0 4px 12px rgba(80, 227, 194, 0.3);

/* Button Shadow - Orange */
box-shadow: 0 4px 12px rgba(245, 166, 35, 0.3);
```

## Focus State

```css
/* Blue Focus Glow */
border-color: #4A90E2;
box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
```

## Common Patterns

### Button Hover Effect
```css
.button:hover {
  background: #3A7BC8;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(74, 144, 226, 0.4);
}
```

### Card Hover Effect
```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(74, 144, 226, 0.15);
  border-color: #4A90E2;
}
```

### Input Focus Effect
```css
.input:focus {
  outline: none;
  border-color: #4A90E2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}
```

## CSS Variables (in main.css)

```css
:root {
  --brand: #4A90E2;
  --brand-dark: #3A7BC8;
  --secondary: #50E3C2;
  --accent: #F5A623;
  --bg: #F7F7F7;
  --text: #333333;
  --text-secondary: #666666;
  --surface: #FFFFFF;
  --border: #E0E0E0;
}
```

## Usage Examples

### Primary Button
```jsx
<button className="btn btn-primary">
  Click Me
</button>
```

### Secondary Button (Teal)
```jsx
<button className="btn btn-secondary">
  Alternative Action
</button>
```

### Accent Button (Orange)
```jsx
<button className="btn btn-danger">
  Delete / Alert
</button>
```

### Card with Hover
```jsx
<div className="card">
  Content here
</div>
```

### Input with Focus
```jsx
<input 
  type="text" 
  className="form-input"
  placeholder="Enter text..."
/>
```

---

**Quick Tip**: All colors are designed for accessibility with proper contrast ratios for elderly users!
