import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import useForm from './useForm';

type TStatus = 'success' | 'error' | 'loading' | null;

export default function App() {
  const [error, setError] = useState<null | string>(null);
  const [sendStatus, setSendStatus] = useState<TStatus>(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const { sendEmail } = useForm();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null);
    setEmail(email.trim());
    if (email === '') {
      setError('Please enter your email address.');
      return;
      // check if email is valid
    } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSendStatus('loading');

    sendEmail(e, (error) => {
      setSendStatus(error ? 'error' : 'success');
    });
  }

  return (
    <div className='container px-4 mx-auto'>
      <Nav />
      <header className='py-4 my-4'>
        <h1 className='text-lg font-bold text-center md:text-3xl'>
          Would You Rather Shorts Generator
        </h1>
      </header>
      <main className='flex flex-col gap-y-10'>
        <section className='flex flex-col items-center'>
          <video
            className='w-full max-w-3xl aspect-[1.92/1] rounded-lg shadow-md ring-4 md:ring-8 ring-primary/70'
            src='/wyr-shorts-generator/WYR-Demo.mp4'
            autoPlay
            controls
            muted
            loop
          />
        </section>

        <section className='flex flex-col items-center justify-center rounded-lg'>
          <h2 className='mb-3 text-lg font-bold text-center md:text-3xl'>
            Unlimited Access:{' '}
            <span className='text-primary whitespace-nowrap'>Only $30</span>
          </h2>
          <p className='px-6 mb-5 text-base text-center md:text-lg'>
            Gain instant access to the source code repository and receive
            automatic updates.
          </p>

          <form
            className='flex flex-col items-center justify-center w-full'
            onSubmit={handleSubmit}
          >
            <div className='w-full max-w-[42rem] md:px-10 flex justify-center items-center flex-col gap-y-4'>
              <div className='flex items-center justify-center w-full gap-x-2 md:gap-x-4'>
                <label className='w-full max-w-[calc(100%-62px)] input input-bordered flex items-center gap-2'>
                  <svg
                    className='w-4 h-4 opacity-70'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 16 16'
                    fill='currentColor'
                  >
                    <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
                    <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
                  </svg>
                  <input
                    className='grow placeholder:text-base-content'
                    placeholder='Email'
                    name='from_email'
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    type='text'
                  />
                </label>

                <button
                  className='btn btn-primary'
                  disabled={sendStatus === 'loading'}
                >
                  <span className='hidden md:inline-block'>Get Access Now</span>
                  <span className='inline-block md:hidden'>
                    {/* send icon */}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon icon-tabler icon-tabler-send'
                      width='22'
                      height='22'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M10 14l11 -11' />
                      <path d='M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5' />
                    </svg>
                  </span>
                </button>
              </div>

              <textarea
                className='w-full textarea textarea-bordered'
                placeholder={'Write your message here...'}
                name='message'
                rows={4}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
              ></textarea>
            </div>

            <div className='my-3'>
              {sendStatus === 'error' && error ? (
                <p className='text-red-500'>{error}</p>
              ) : (
                sendStatus === 'error' && (
                  <p className='text-red-500'>
                    Something went wrong. Please try again or contact me at{' '}
                    <a
                      className='link link-primary link-hover'
                      href='mailto:ayoub.nachat.27@gmail.com'
                    >
                      ayoub.nachat.27@gmail.com
                    </a>
                  </p>
                )
              )}

              {sendStatus === 'success' && (
                <p className='text-green-500'>
                  Thank you for applying, I will responde as soon as possible!
                </p>
              )}
              {sendStatus === 'loading' && (
                <div className='flex flex-col items-center justify-center'>
                  <span className='loading loading-dots loading-md'></span>

                  <p className='text-amber-500'>
                    Your purshase is being processed...
                  </p>
                </div>
              )}
            </div>

            <ReCAPTCHA sitekey={'6LcUif0pAAAAAP_LLBqkMQa9b_X6h4u6WcrwJIBa'} />
          </form>
        </section>
      </main>

      <div className='mb-0 divider'></div>

      <footer className='py-4 text-center text-gray-500'>
        &copy; {new Date().getFullYear()}{' '}
        <a
          href='github.com/nachat-ayoub'
          className='link link-primary link-hover'
        >
          Nachat Ayoub
        </a>
      </footer>
    </div>
  );
}

function Nav() {
  const repoLink = 'https://github.com/nachat-ayoub' + window.location.pathname;

  return (
    <nav className='justify-between w-full px-0 navbar'>
      <div className='flex justify-center items-center gap-x-2.5'>
        <img
          className='w-8 h-8 md:w-10 md:h-10'
          src='/wyr-shorts-generator/WYR-Logo.svg'
          alt='WYR Logo'
        />
        <span
          className={
            'flex flex-col md:flex-row md:gap-x-1 text-sm md:text-base font-bold'
          }
        >
          <span className='inline-block whitespace-nowrap'>WYR Shorts</span>
          <span>Generator</span>
        </span>
      </div>

      <div className='flex items-center justify-center gap-x-3'>
        <a
          className='px-1 aspect-square btn btn-ghost'
          target={'_blank'}
          href={repoLink}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-brand-github'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='none'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5' />
          </svg>
        </a>

        <label className='btn btn-ghost aspect-square swap swap-rotate'>
          {/* this hidden checkbox controls the state */}
          <input type='checkbox' className='theme-controller' value='light' />

          {/* sun icon */}
          <svg
            className='w-6 h-6 fill-current swap-on'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
          </svg>

          {/* moon icon */}
          <svg
            className='w-6 h-6 fill-current swap-off'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
          </svg>
        </label>
      </div>
    </nav>
  );
}
