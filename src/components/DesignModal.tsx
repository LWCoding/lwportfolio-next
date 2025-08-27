"use client";

import { useEffect } from "react";
import Button from "./Button";

interface DesignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DesignModal({ isOpen, onClose }: DesignModalProps) {
  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-background border border-border rounded-lg shadow-2xl max-w-sm w-full mx-4">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground text-center">What is Design?</h3>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <p className="text-muted-foreground text-sm italic text-center">
            *I get this question a lot...*
          </p>
          
          <p className="text-foreground text-sm text-center">
            It's in the engineering department! It&apos;s basically <span className="font-semibold text-primary">engineering + psychology + art</span> all mixed together.
          </p>
          
          <p className="text-muted-foreground text-sm text-center">
            I like making real things that affect real people! :)
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button onClick={onClose} variant="primary" className="w-full text-sm">
            Ah, makes sense!
          </Button>
        </div>
      </div>
    </div>
  );
}
