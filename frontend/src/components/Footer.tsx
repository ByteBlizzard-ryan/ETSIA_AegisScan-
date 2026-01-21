export default function Footer() {
  return (
    <footer
      className="flex items-center justify-between px-8 py-4 border-t text-sm"
      style={{
        backgroundColor: "#ffffff",
        borderColor: "var(--border)",
        color: "var(--muted-foreground)",
      }}
    >
      <span>&copy; 2026 AegisScan. Tous droits réservés</span>
      <a
        href="#"
        className="hover:underline"
        style={{ color: "var(--primary)" }}
      >
        Politique de confidentialité
      </a>
    </footer>
  );
}
