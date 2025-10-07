# Financial Tracker Design Guidelines

## Design Approach: Design System Based

**Selected System:** Material Design with financial application adaptations
**Rationale:** Financial applications require clear data hierarchy, trustworthy presentation, and excellent readability. Material Design provides robust patterns for data-dense interfaces while maintaining visual clarity.

**Key Design Principles:**
- Trust through clarity: Clean layouts with obvious data hierarchy
- Information density: Maximum data visibility without clutter
- Visual consistency: Predictable patterns for faster user learning
- Action-oriented: Clear pathways for adding transactions and managing finances

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Background: 222 47% 11% (rich dark slate)
- Surface: 222 47% 15% (elevated panels)
- Surface Variant: 222 47% 19% (cards, inputs)
- Primary: 158 64% 52% (trustworthy teal for positive/income)
- Destructive: 0 84% 60% (expenses/negative actions)
- Success: 142 71% 45% (budget achievements)
- Warning: 38 92% 50% (budget warnings)
- Muted Text: 222 10% 70%
- Primary Text: 222 10% 95%

**Light Mode:**
- Background: 0 0% 100%
- Surface: 0 0% 98%
- Surface Variant: 220 13% 95%
- Primary: 158 64% 42%
- Text: 222 47% 11%

### B. Typography

**Font Families:**
- Primary: 'Inter' (Google Fonts) - for UI and body text
- Monospace: 'Roboto Mono' (Google Fonts) - for financial figures only

**Hierarchy:**
- Page Headers: text-3xl font-bold
- Section Headers: text-xl font-semibold
- Card Titles: text-lg font-medium
- Body: text-base font-normal
- Financial Figures: text-2xl font-semibold font-mono (for amounts)
- Labels: text-sm font-medium text-muted
- Captions: text-xs text-muted

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, and 8 predominantly
- Component padding: p-6
- Card spacing: space-y-4
- Section gaps: gap-6 or gap-8
- Page margins: p-4 md:p-6 lg:p-8

**Grid Structure:**
- Dashboard: 12-column responsive grid
- Desktop: 3-column layout (sidebar + main + summary)
- Tablet: 2-column (collapsible sidebar + main)
- Mobile: Single column with bottom navigation

### D. Component Library

**Dashboard Cards:**
- Balance card: Prominent display with large monospace figures, gradient background from primary to darker primary shade
- Income/Expense summary: Side-by-side cards with iconography (trending up/down arrows from Heroicons)
- Quick stats: Compact cards showing monthly totals, category breakdowns

**Transaction Form:**
- Floating action button (bottom-right) triggering modal overlay
- Form fields: Amount (large input with currency symbol), Category (dropdown with icons), Type (toggle pills: Income/Expense), Date (calendar picker), Description (textarea)
- Split buttons: Save & Add Another, Save & Close

**Transaction List:**
- List items with: Category icon (left), Description + Date (center), Amount with color coding (right)
- Filters: Chips for All/Income/Expense, dropdown for category filtering
- Search bar with debounced input
- Infinite scroll or pagination for long lists
- Swipe actions on mobile: Delete (red), Edit (blue)

**Charts & Visualizations:**
- Monthly trends: Line chart with dual axes (income in teal, expenses in red)
- Category breakdown: Doughnut chart with legend, interactive segments
- Budget progress: Horizontal progress bars with percentage labels
- Use Chart.js or Recharts library via CDN

**Navigation:**
- Desktop: Fixed left sidebar (256px width) with Dashboard, Transactions, Analytics, Budgets, Settings sections
- Mobile: Bottom tab bar with 4-5 primary actions
- Icons from Heroicons

**Forms & Inputs:**
- Input fields: Rounded borders (rounded-lg), focus ring in primary color
- Buttons: Primary (solid primary bg), Secondary (outline), Destructive (red)
- Dropdowns: Native-styled with custom arrow icon
- Date picker: Calendar overlay with month/year navigation

**Data Displays:**
- Tables: Zebra striping, hover states, sticky headers for long lists
- Empty states: Centered illustration placeholder with "Add your first transaction" CTA
- Loading states: Skeleton screens for cards and lists

### E. Animations

**Minimal, Purposeful Motion:**
- Card hover: Subtle scale (hover:scale-[1.02]) with shadow increase
- Chart loading: Smooth entry animations (fade + slide)
- Form transitions: Modal slide-up from bottom (mobile) or fade-in (desktop)
- Number changes: Brief highlight flash when values update
- NO page transition animations, NO scroll-triggered effects

## Key Interaction Patterns

**Quick Add Transaction:** Keyboard shortcut (Ctrl/Cmd + N) opens transaction form
**Bulk Actions:** Checkbox selection on transaction list for multi-delete
**Inline Editing:** Double-click transaction to edit without modal
**Keyboard Navigation:** Full keyboard support for form inputs and navigation

## Responsive Breakpoints

- Mobile: < 640px (single column, bottom nav)
- Tablet: 640px - 1024px (2-column layout)
- Desktop: > 1024px (3-column with sidebar)

This design creates a professional, data-focused financial interface that prioritizes clarity and efficient task completion while maintaining visual polish.