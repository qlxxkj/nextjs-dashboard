import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <main className="flex md:h-screen">
          <div className="relative mx-auto flex w-full items-center bg-cover bg-[url('/FemaleAdventurer1.png')]">
            <div className="absolute rounded-2xl bg-black-400 mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 ml-8">
                <LoginForm />
            </div>

        </div>
    </main>
  );
}