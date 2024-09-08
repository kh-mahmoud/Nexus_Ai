import { SignIn } from "@clerk/clerk-react";



const SignInPage = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <SignIn path="/sign-in"  signUpUrl="/sign-up" afterSignInUrl={"/dashboard"}/>
    </div>);
}

export default SignInPage;
