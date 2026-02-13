/** Shared icon for WhatsApp Us button (uses custom Group.png asset). */

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <img
      src="/Group.png"
      alt=""
      className={className}
      width={20}
      height={20}
      aria-hidden="true"
    />
  );
}
