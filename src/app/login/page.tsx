import FormLogin from "@/components/login/FormLogin";
import { LoginSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

function page() {
  return (
    <>
      <Suspense fallback={<LoginSkeleton />}>
        <FormLogin />
      </Suspense>
    </>
  );
}

export default page;
