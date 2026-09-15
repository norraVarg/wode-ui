/**
 * Narrows a Base UI component's props to a plain string `className`,
 * dropping the `(state) => string` function form. None of this library's
 * styling relies on that form - state-based styling goes through Base UI's
 * own `data-*` attributes and Tailwind's `data-[attr]:` variants instead -
 * so every wrapped Base UI primitive keeps a simple, consistent className
 * prop across the whole public API.
 */
export type SimplifyClassName<T> = Omit<T, 'className'> & { className?: string };
