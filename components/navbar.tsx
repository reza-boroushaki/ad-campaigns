import Link from "next/link";

const Navbar = () => {
  return (
    <div className="border border-b py-4">
      <nav className="container space-x-6 font-bold">
        <Link href="./">Home</Link>
      </nav>
    </div>
  );
};

export default Navbar;
