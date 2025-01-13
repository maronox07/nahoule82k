export default function Footer() {
  return (
    <footer className="bg-stakeDark p-4 text-center">
      <p className="text-sm text-gray-300">
        © {new Date().getFullYear()} Nahoule Casino. All rights reserved.
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Gamble responsibly. 18+ only.
      </p>
    </footer>
  );
}
