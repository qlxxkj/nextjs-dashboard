import SignUpForm from "../ui/signup-form";

export default function SignupPage () {
    return (
        <main className="flex md:h-screen">
            <div className="relative mx-auto flex w-full items-center bg-cover bg-[url('/FemaleAdventurer1.png')]">
                <div className="absolute rounded-2xl bg-black-400 mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 ml-8">
                    <SignUpForm />
                </div>
            </div>
        </main>
    );
}