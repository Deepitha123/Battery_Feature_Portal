# Header Conditional Logic Update

## ✅ Implemented Feature-Based Header Visibility

I've updated the top navigation bar to hide the selector inputs when any feature other than "Battery Pack Brain" is active.

### 🎯 Logic Implemented

**1. Active Feature: "Battery Pack Brain"**
- **Inputs**: Visible ✅
- **Logic**: Shows either Single Battery selectors (Chemistry + ID) or Hybrid Battery selector (Pack ID) based on the tab.
- **Badge**: Visible ✅

**2. Active Feature: Anything Else (e.g., "LFP Peak Shaver Logic")**
- **Inputs**: Hidden ❌ (Empty space)
- **Badge**: Visible ✅ ("MONITORING LIVE")

### 🔧 Technical Details

- **Header.jsx**: Now subscribes to `NavigationContext`.
- **Conditional Rendering**: Added a `renderSelectors()` helper function that returns `null` if `activeSection !== 'Battery Pack Brain'`.

### 🚀 How to Test

1.  Open **http://localhost:3000**
2.  Select **"Battery Pack Brain"** in sidebar → You see the dropdowns in the header.
3.  Select **"The Tariff Buster Sim"** in sidebar → The dropdowns disappear, but "MONITORING LIVE" remains.
4.  Select back to **"Battery Pack Brain"** → The dropdowns reappear.

This functionality effectively "focuses" the interface on the active feature, reducing clutter for features that are still under development or don't require specific battery selection.
