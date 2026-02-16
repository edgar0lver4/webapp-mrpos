"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "@infraestructure/Urls";
import { useRouter } from "next/navigation";
type Params = { token: string; name: string };
export const GeneratorProfileComp = ({ token, name }: Params) => {
  const [loading, setLoading] = useState(true);
  const { push, refresh } = useRouter();
  const terminateProfile = useCallback(async () => {
    try {
      await axios.post(
        `${API_BASE}/profile`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      push("/");
      refresh();
    } catch (e) {
      console.log("Error");
    }
  }, [token]);

  useEffect(() => {
    terminateProfile();
  }, [terminateProfile]);

  return (
    <div className="flex flex-col items-center">
      <Image src={"/assets/logo-1-1.png"} width={230} height={230} alt="logo" />
      <p className="description-body text-white mt-4 mb-8">
        Configurando tu perfil {name}
      </p>
      {loading && <span className="loader-dot"></span>}
    </div>
  );
};
