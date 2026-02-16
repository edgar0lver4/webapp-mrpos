"use client";
import { Divider } from "@mui/material";
import { Badge } from "../Badge";
import { FaSignOutAlt } from "react-icons/fa";
import { SessionService } from "@ui/services/Session";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { push, refresh } = useRouter();
  const handleLogout = async () => {
    const session = new SessionService();
    await session.logout();
    push("/");
    refresh();
  };
  return (
    <nav className="flex flex-row justify-end w-full px-4 py-2">
      <div className="flex flex-row mr-2">
        <div className="mr-2">
          <p>ProfileImage</p>
        </div>
        <Badge variant="default">Gratis</Badge>
      </div>
      <Divider orientation="vertical" variant="middle" flexItem />
      <button onClick={handleLogout} className="flex flex-row gap-1 ml-2">
        Salir
        <FaSignOutAlt size={24} />
      </button>
    </nav>
  );
};

export default Navbar;
