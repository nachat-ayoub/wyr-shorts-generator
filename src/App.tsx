import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';
import useForm from './useForm';
import axios from 'axios';

type TStatus = 'success' | 'error' | null;

export default function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendStatus, setSendStatus] = useState<TStatus>(null);
  const [error, setError] = useState<null | string>(null);
  const { sendEmail } = useForm();
  const captchaRef = useRef(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

    if (captchaRef?.current && typeof captchaRef.current !== 'string') {
      // @ts-ignore
      const token = captchaRef.current.getValue();
      // @ts-ignore
      captchaRef.current.reset();

      axios
        .post('https://dummy-api-phi.vercel.app/api/reCaptcha', { token })
        .then((res) => console.log(res))
        .catch((error) => {
          console.log(error);
        });
      return;

      sendEmail(e, (error) => {
        if (error) {
          setSendStatus('error');
        } else {
          setSendStatus('success');
        }
      });
    }
  }

  return (
    <div className='container mx-auto px-4'>
      <Nav />
      <header className='py-4 my-4'>
        <h1 className='text-lg md:text-3xl font-bold text-center'>
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

        <section className='flex justify-center items-center flex-col rounded-lg'>
          <h2 className='text-lg md:text-3xl font-bold mb-3'>
            Unlimited Access: <span className='text-primary'> Only $30 </span>
          </h2>
          <p className='text-lg text-center mb-5 px-6'>
            Gain instant access to the source code repository and receive
            automatic updates.
          </p>

          <form
            className='w-full max-w-[42rem] px-4 md:px-10 flex justify-center items-center flex-col gap-y-4'
            onSubmit={handleSubmit}
          >
            <div className='flex items-center justify-center w-full gap-x-4'>
              <label className='w-full input input-bordered flex items-center gap-2'>
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

              <button className='btn btn-primary'>Get Access Now</button>
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

            <ReCAPTCHA
              ref={captchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(value) => {
                console.log('Captcha value:', value);
              }}
            />
          </form>

          <div className='mt-3'>
            {error ? (
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
          </div>
        </section>
      </main>

      <div className='divider mb-0'></div>

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
    <nav className='w-full navbar justify-between'>
      <div className='flex justify-center items-center gap-x-2.5'>
        <img
          className={'w-10 h-10'}
          src='/wyr-shorts-generator/WYR-Logo.svg'
          alt='WYR Logo'
        />
        <span className={'text-base font-bold'}>WYR Shorts Generator</span>
      </div>

      <div className='flex justify-center items-center gap-x-3'>
        <a
          className='btn btn-ghost text-neutral-content'
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
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5' />
          </svg>
        </a>

        <div className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn m-1'>
            Theme
            <svg
              width='12px'
              height='12px'
              className='h-2 w-2 fill-current opacity-60 inline-block'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 2048 2048'
            >
              <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52'
          >
            <li>
              <input
                type='radio'
                name='theme-dropdown'
                className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
                aria-label='Default'
                value='default'
              />
            </li>

            <li>
              <input
                type='radio'
                name='theme-dropdown'
                className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
                aria-label='Light'
                value='light'
              />
            </li>

            <li>
              <input
                type='radio'
                name='theme-dropdown'
                className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
                aria-label='Dark'
                value='dark'
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
