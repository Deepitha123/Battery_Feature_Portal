# Header Selectors Update

## ✅ Implemented Conditional Header Selectors

I've updated the top navigation bar to display different input options based on the selected battery mode.

### 🔄 Dynamic Selectors

**1. Single Battery View** (Default)
- **Inputs**: 2 Selectors
- **Selector 1**: Chemistry ("CALB (LFP)", etc.)
- **Selector 2**: Battery ID ("CALB_0_B182.pkl")
- **Behavior**: Same as before.

**2. Hybrid Battery View** (New)
- **Inputs**: 1 Selector ONLY
- **Selector**: Battery Pack
- **Label**: "BATTERY PACK" (changed from "BATTERY ID")
- **Behavior**: Chemistry selector is hidden.

### 🔧 Technical Changes

- **Updated `BatterySelector.jsx`**: Now accepts a `label` prop to allow text customization.
- **Updated `Header.jsx`**: Added conditional rendering logic based on the current route (`/hybrid-battery`).
- **Logic**: 
  ```jsx
  {isHybrid ? (
      <BatterySelector label="BATTERY PACK" />
  ) : (
      <>
          <ChemistrySelector />
          <BatterySelector />
      </>
  )}
  ```

### 🎯 How to Verify
1.  Open **http://localhost:3000**
2.  Click **"Single Battery"**: You should see both Chemistry and Battery ID selectors.
3.  Click **"Hybrid Battery"**: You should see **ONLY** the "BATTERY PACK" selector.

The application now perfectly matches the requirement for context-aware header inputs! 🎛️
