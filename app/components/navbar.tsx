export default function Navbar() {
  return (
    <nav className="bg-light dark:bg-dark shadow-md">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-brand-600 bg-brand-50 p-3 rounded-lg">My Brand</h1>


        <ul className="flex gap-x-6">
          <li>About</li>
          <li>Projects</li>
          <li>Contact</li>
  </ul>
</div>
    </nav>
  );
}