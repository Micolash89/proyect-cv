import FormRegister from "@/components/FormRegister";
import FormUser from "@/components/FormUser";
import { getAllUsers } from "@/database/database";
import { postUsuarios } from "@/lib/actions";
import { headers } from "next/headers";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      {/* <FormUser /> */}

      <FormRegister/>

    </>
  );
}
