import { SignUp } from "@clerk/clerk-react";




const SignUpPage = () => {
  return (
    <div className="flex min-h-screen justify-center items-center py-4">
      <SignUp path="/sign-up" signInUrl="/sign-in" afterSignUpUrl={"/dashboard"} />
    </div>
  );
}

export default SignUpPage;
