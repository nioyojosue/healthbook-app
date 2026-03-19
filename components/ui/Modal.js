'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Modal Component
 * Dialog réutilisable avec header, body, footer
 * Sizes: sm, md (défaut), lg, xl
 */

export function Modal({
  isOpen = false,
  onClose = () => {},
  title = '',
  children,
  footer = null,
  size = 'md',
  closeButton = true,
  className = '',
}) {
  // Empêcher le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  const sizeClass = sizes[size] || sizes.md;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative bg-white rounded-lg shadow-xl w-full mx-4 ${sizeClass} ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-text">{title}</h2>
          {closeButton && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-background rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X size={20} className="text-text-secondary" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-4 max-h-96 overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-border bg-background flex gap-3 justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * ModalTrigger Helper Component
 * Simplifie l'usage du modal
 */
export function useModalState(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(!isOpen),
  };
}

export default Modal;
