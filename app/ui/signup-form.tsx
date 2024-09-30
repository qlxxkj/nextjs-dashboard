'use client';

import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
  } from '@heroicons/react/24/outline';
import { Button } from './components/button';
import TitansLogo from './titans-logo';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


export default function SignUpForm(){
    const [errorMessage, setErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const validatePassword = (pass: string) => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;
        return regex.test(pass);
    };

    useEffect(() => {
        setIsPasswordValid(validatePassword(password));
    }, [password]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          if (response.ok) {
            alert(data.message);
            // 跳转到验证码输入页面
            const router = useRouter();
            router.push({
                pathname: '/verify',
                query: {email: data.email},
            });
          } else {
            setErrorMessage(data.error || 'Registration failed, please try again.');
          }
        } catch (error) {
          console.error('Registration error:', error);
          setErrorMessage('Registration error, please try again.');
        }
      };
    

    return (
    <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        
        <div className='flex justify-center mb-2'>
            <div className='w-[60px] h-[60px]'>
                <TitansLogo />
            </div>
        </div>
        <span className='flex justify-center font-sans text-white text-l mb-5 '>
            Sign up or Login with
        </span>


        <button type="button" className="rounded-xl w-full bg-black-600 text-white flex py-3 px-5 my-3 hover:bg-zinc-600">
            <span className='mr-2'>
                <svg width={24} height={24} viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' focusable='false'>
                    <g clipPath='url(#clip0_687_7)'>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8135 6.87448C14.3733 6.87448 13.8539 6.97713 13.2552 7.18242C12.6566 7.38782 12.2252 7.49057 11.9611 7.49067C11.7556 7.49067 11.3404 7.39967 10.7153 7.21766C10.0903 7.03566 9.55765 6.94465 9.11744 6.94465C8.08448 6.94465 7.22906 7.37906 6.55116 8.24786C5.87328 9.11625 5.53434 10.2401 5.53434 11.6195C5.537 12.383 5.64967 13.1421 5.86887 13.8734C6.11011 14.6726 6.44399 15.4407 6.86371 16.1623C7.30975 16.9429 7.75875 17.5283 8.21069 17.9186C8.66259 18.3089 9.11744 18.504 9.57526 18.504C9.88044 18.504 10.2781 18.4028 10.7682 18.2003C11.2583 17.9977 11.6882 17.8965 12.0579 17.8965C12.4277 17.8965 12.881 17.9934 13.4181 18.1871C13.9551 18.381 14.3762 18.4779 14.6814 18.4778C15.0688 18.4778 15.4561 18.331 15.8435 18.0375C16.2308 17.744 16.6182 17.3008 17.0056 16.708C17.2507 16.3377 17.4727 15.9525 17.6703 15.5547C17.8479 15.1974 17.9965 14.8265 18.1149 14.4454C17.5807 14.2871 17.1053 13.9086 16.6887 13.3098C16.2746 12.7198 16.056 12.0147 16.0636 11.2939C16.0653 10.805 16.175 10.3224 16.3849 9.88082C16.5991 9.42003 17.032 8.91385 17.6834 8.36228C17.2668 7.84574 16.8266 7.46859 16.3629 7.23082C15.8826 6.98926 15.3511 6.86702 14.8135 6.87448ZM14.6638 3.47627C13.6132 3.7166 12.8605 4.16264 12.4056 4.81441C11.9508 5.46585 11.7175 6.23757 11.7058 7.12956C12.1636 7.10617 12.5304 7.03279 12.8063 6.90942C13.1095 6.76688 13.384 6.56998 13.6162 6.32848C13.9777 5.97689 14.2625 5.55422 14.4526 5.08712C14.6286 4.64107 14.7167 4.23027 14.7167 3.85473C14.7167 3.79608 14.7137 3.73744 14.7079 3.67847C14.6999 3.6098 14.6851 3.54207 14.6638 3.47627ZM12.0004 0.402344C18.4155 0.402344 23.616 5.60266 23.616 12.0181C23.616 18.4332 18.4155 23.6335 12.0004 23.6335C5.58526 23.6335 0.384766 18.4332 0.384766 12.0181C0.384766 5.60267 5.58525 0.402344 12.0004 0.402344Z" fill="white"></path>
                    </g>
                    <defs>
                        <clipPath id='clip0_687_7'>
                            <rect width={24} height={24} fill='white'></rect>
                        </clipPath>
                    </defs>
                </svg>
            </span>
                <span className='text-gray-400'>Apple</span>
        </button>
        <button type="button" className="rounded-xl w-full bg-black-600 text-white flex py-3 px-5 my-3 hover:bg-zinc-600">
            <span className='mr-2'>
                <svg width="calc(1rem * 1.5)" height="calc(1rem * 1.5)" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M22.1437 10.0266H13.2141C12.8203 10.0266 12.5016 10.3454 12.5016 10.7391V13.5938C12.5016 13.9875 12.8203 14.3063 13.2141 14.3063H18.2437C17.6953 15.736 16.6641 16.9313 15.3562 17.6907L17.4984 21.4032C20.9344 19.4157 22.9687 15.9235 22.9687 12.0188C22.9687 11.461 22.9266 11.0625 22.8469 10.6172C22.7812 10.275 22.4859 10.0266 22.1437 10.0266Z" fill="#167EE6"></path><path d="M12.0234 18.5906C9.56249 18.5906 7.41561 17.2453 6.26249 15.2578L2.54999 17.3953C4.43905 20.6719 7.97811 22.875 12.0234 22.875C14.0109 22.875 15.8812 22.3406 17.4984 21.4078V21.4031L15.3562 17.6906C14.3719 18.2625 13.2375 18.5906 12.0234 18.5906Z" fill="#12B347"></path><path d="M17.4938 21.4079V21.4032L15.3516 17.6907C14.3719 18.2579 13.2375 18.5907 12.0234 18.5907V22.875C14.0109 22.875 15.8813 22.3407 17.4938 21.4079Z" fill="#0F993E"></path><path d="M5.3625 11.9297C5.3625 10.7157 5.69531 9.5813 6.2625 8.60161L2.55 6.46411C1.6125 8.07192 1.07812 9.93755 1.07812 11.9297C1.07812 13.9219 1.6125 15.7875 2.55 17.3954L6.2625 15.2579C5.69063 14.2782 5.3625 13.1438 5.3625 11.9297Z" fill="#FFD500"></path><path d="M12.0234 5.26875C13.6266 5.26875 15.1031 5.84063 16.2516 6.7875C16.5375 7.02188 16.95 7.00312 17.2078 6.74531L19.2281 4.725C19.5234 4.42969 19.5 3.94688 19.1859 3.675C17.2594 1.99688 14.7516 0.984375 12.0234 0.984375C7.97811 0.984375 4.43905 3.1875 2.54999 6.46406L6.26249 8.60156C7.41561 6.61406 9.56249 5.26875 12.0234 5.26875Z" fill="#FF4B26"></path><path d="M16.2516 6.7875C16.5375 7.02188 16.95 7.00312 17.2078 6.74531L19.2281 4.725C19.5234 4.42969 19.5 3.94688 19.1859 3.675C17.2594 1.99688 14.7516 0.984375 12.0234 0.984375V5.26875C13.6266 5.26875 15.1031 5.83594 16.2516 6.7875Z" fill="#D93F21"></path></svg>
            </span>
                <span className='text-gray-400'>Google</span>
        </button>
        <button type="button" className="rounded-xl w-full bg-black-600 text-white flex py-3 px-5 hover:bg-zinc-600">
            <span className='mr-2'>
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4248" width="24" height="24"><path d="M511.922276 511.609221m-511.609221 0a511.609221 511.609221 0 1 0 1023.218442 0 511.609221 511.609221 0 1 0-1023.218442 0Z" fill="#3A5A98" p-id="4249"></path><path d="M873.837341 150.598776c199.795873 199.795873 199.804509 523.742792-0.008636 723.553779-199.804509 199.795873-523.757905 199.795873-723.553778 0L873.837341 150.598776z" fill="#345387" p-id="4250"></path><path d="M1020.219594 569.232889L650.137037 199.141697l-192.146542 192.146542 11.44701 11.44701-109.398609 109.389973 89.5423 89.542301-11.777336 11.770859 96.941188 96.941188-111.758394 111.758395 190.918072 190.918072c215.291005-43.568588 381.473432-222.312068 406.314868-443.823148z" fill="#2E4D72" p-id="4251"></path><path d="M422.47713 321.554749v85.800756h-62.859239v104.923006h62.859239v311.763691h129.125378V512.278511h86.649243s8.117834-50.319776 12.045052-105.318102h-98.202043v-71.745677c0-10.71295 14.072352-25.132901 27.991414-25.132901h70.355282V200.853783h-95.656584c-135.505218-0.006477-132.307742 105.013683-132.307742 120.700966z" fill="#FFFFFF" p-id="4252"></path></svg>
            </span>
                <span className='text-gray-400'>Facebook</span>
        </button>

        <div className='relative py-5'>
            <div className='absolute inset-0 flex items-center' >
                <div className='w-full border-b border-zinc-600'></div>
            </div>
            <div className='relative flex justify-center text-center'>
                <span className='h-7 w-7 border border-zinc-600 rounded-full bg-black-500 text-white text-xs content-center'>
                    OR
                </span>
            </div>
        </div>
        <div className="flex w-full rounded-md h-10 justify-center items-center bg-transperant border border-green-500 text-green-500">
            <span>Sign up with a new account</span>
        </div>

        <div className="w-full">
            <div>
            <label
                className="mb-3 mt-3 block text-l text-white font-sans"
                htmlFor="email"
            >
                Email
            </label>
            <div className="relative">
                <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            </div>
            <div className="mt-4">
            <label
                className="mb-3 mt-5 block text-l text-white font-sans"
                htmlFor="password"
            >
                Password
            </label>
            <div className="relative">
                <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            </div>
        </div>
            {!isPasswordValid && password.length > 0 && (
            <p className="text-sm text-red-500">
                Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.
            </p>
            )}

            <Button className="mt-6 w-full rounded-md h-12 justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-blend-hard-light aria-disabled:opacity-10 aria-disabled:curor-not-allowed" 
            aria-disabled={!isPasswordValid}
            
            type='submit'
            >
                Sign Up
            </Button>

            <div className='mt-6 text-gray-400 flex justify-center'>
                <span>Already have an account ?</span>
                <a href="/login" className='ml-1 text-indigo-600 hover:text-gray-400'>Sign in</a>
            </div>
        <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
        >
            {/* Add form errors here */}
            {errorMessage && (
            <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
            </>
            )}
        </div>
        </div>
    </form>
    );
}