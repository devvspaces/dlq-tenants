import Image from "next/image";
import Link from "next/link";
import { HOME } from "@/constants/path";

import authImg from "@/assets/images/auth.svg";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="md:grid md:grid-cols-2 h-screen">
      <div className="p-5 md:p-10 hidden md:block">
        <Link href={HOME}>
          <Image className="w-10/12 mt-10 m-auto" src={authImg} alt="auth" />
        </Link>
      </div>
      <div className="p-5 md:p-10 lg:p-20 overflow-y-scroll">{children}</div>
    </div>
  );
};

export default Layout;
