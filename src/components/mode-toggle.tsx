"use client";

import { useSpring, animated, config } from "@react-spring/web";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  const { rotation, opacitySun, opacityMoon } = useSpring({
    rotation: isDark ? 180 : 0,
    opacitySun: isDark ? 0 : 1,
    opacityMoon: isDark ? 1 : 0,
    config: config.gentle,
  });

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative cursor-pointer"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {/* 🌞 Sun Icon */}
      <animated.div
        style={{
          position: "absolute",
          opacity: opacitySun,
          rotate: rotation.to((r) => `${r}deg`),
        }}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </animated.div>

      {/* 🌙 Moon Icon */}
      <animated.div
        style={{
          opacity: opacityMoon,
          rotate: rotation.to((r) => `${r + 180}deg`),
        }}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </animated.div>
    </Button>
  );
}
