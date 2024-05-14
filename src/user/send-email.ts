import emailjs from '@emailjs/nodejs';

emailjs.init({
    publicKey: 'EUxWdd9Aqy7mXr_Kx',
});

export const sendRecoverLetter = (password: string, email: string) => {
    emailjs.send("service_z6oty4d", "template_cmgtpys", {
        message: password,
        user_email: email
    })
}