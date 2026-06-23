import Image from "next/image";
import Logo from "../../../assets/images/logo/logo.png"
import Link from "next/link";
export const NavLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-200 glow-effect">
      <Image src={Logo} alt="fire-dragon-logo" width={70} height={50} />
    </Link>
  );
};
