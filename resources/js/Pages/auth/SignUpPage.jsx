import SignUpForm from "../../components/forms/SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl xl:text-4xl font-semibold">Sign Up</h1>
        <p className="mt-1 text-gray-400">Fill up the details to get started.</p>
      </div>

      <div className="w-full">
        <SignUpForm />
      </div>
    </>
  );
}