import Link from 'next/link';
import HeaderText from '../HeaderText';
const Navbar = () => {
  return (
    <div className="flex justify-between items-center cursor-pointer py-5 px-5 h-24 text-white ">
      <HeaderText size="text-4xl" weight="font-black" text="Streamora" color="text-zinc-300"/>
      <div className="flex gap-10 text-zinc-300 font-light">
        <Link href="/">Home</Link>
        <Link href="/movies">Movies</Link>
        <Link href="/tv">TV Shows</Link>
      </div>
    </div>
  );
};

export default Navbar;
