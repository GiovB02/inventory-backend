import { Injectable } from '@nestjs/common';
import { send } from '@emailjs/nodejs';

@Injectable()
export class EmailService {
    async sendOtpEmail(toEmail: string, otp: string): Promise<void> {
        try {
        await send(
            'service_9am5obt',
            'template_2ay76wa',
            {
            email: toEmail,
            passcode: otp,
            },
            {
            publicKey: process.env.EMAILJS_PUBLIC_KEY,
            },
        );
        console.log('OTP enviado a:', toEmail);
        } catch (error) {
        console.error('Error enviando OTP:', error);
        throw error;
        }
    }
}
