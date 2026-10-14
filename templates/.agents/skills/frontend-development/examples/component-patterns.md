# Frontend Component Patterns Example

## Button Component Pattern
```javascript
// Reusable Button with full state handling
export function Button({ 
  variant = 'primary', 
  isLoading = false, 
  disabled = false, 
  children, 
  ...props 
}) {
  const baseClasses = "px-4 py-2 font-medium rounded-md transition-colors focus:outline-none focus:ring-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...props}
    >
      {isLoading ? <span className="spinner mr-2" /> : null}
      {children}
    </button>
  );
}
```
