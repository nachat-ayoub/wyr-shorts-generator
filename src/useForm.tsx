import emailjs from '@emailjs/browser';

function useForm() {
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  function sendEmail(e: any, cb: (error: string | null) => void) {
    try {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY).then(
        function () {
          // console.log('SUCCESS!', response.status, response.text);
          cb(null);
        },
        function () {
          // console.log('FAILED...', err);
          cb('FAILED...');
        }
      );
    } catch (error) {
      console.log(error);
      cb('Failed because of ' + error);
    }
  }

  return { sendEmail };
}

export default useForm;
