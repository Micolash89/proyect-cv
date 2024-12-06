import FormLogin from "@/components/login/FormLogin";
import { Suspense } from "react";

function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <FormLogin />
      </Suspense>
    </>
  );
}

export default page;
