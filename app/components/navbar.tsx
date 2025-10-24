// Navbar.tsx (Server)
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="bg-light dark:bg-dark shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-brand-500 font-heading text-xl">Brand</h1>
        <ul className="flex gap-6">
          <li className="hover:text-brand-600 cursor-pointer">Home</li>
          <li className="hover:text-brand-600 cursor-pointer">FFMI Rechner</li>
          <li className="hover:text-brand-600 cursor-pointer">Kontakt</li>
          <li className="hover:text-brand-600 cursor-pointer">Steroide</li>
        </ul>
        <DarkModeToggle/> {/* Only this is a Client Component */}
      </div>
    </nav>
  );
}