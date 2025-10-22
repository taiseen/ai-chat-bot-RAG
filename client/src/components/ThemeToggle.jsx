import { useEffect, useState } from "react";

const ThemeToggle = () => {

    const [theme, setTheme] = useState(() => {

        if (typeof window !== "undefined") {
            return (
                localStorage.getItem("theme") ||
                (window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light")
            );
        }

        return "light";
    });

    useEffect(() => {
        const root = document.documentElement;

        root.classList.toggle("dark", theme === "dark");
        
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <button
            className="p-2 rounded-full bgInput hoverTheme border borderTheme transition cursor-pointer"
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
            aria-label="Toggle theme"
        >
            {theme === "dark" ? "☀️" : "🌙"}
        </button>
    );
};

export default ThemeToggle;
