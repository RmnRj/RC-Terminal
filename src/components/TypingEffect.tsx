"use client";

import React, { useState, useEffect } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number;
  onFinished?: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 50,
  onFinished,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    if (isSkipped) {
      setDisplayedText(text);
      if (onFinished) onFinished();
      return;
    }

    if (displayedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeoutId);
    } else {
      if (onFinished) onFinished();
    }
  }, [displayedText, text, speed, onFinished, isSkipped]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSkipped(true);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return <span className="whitespace-pre-wrap">{displayedText}</span>;
};

export default TypingEffect;
