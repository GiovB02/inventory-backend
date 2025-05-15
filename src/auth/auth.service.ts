import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly user = {
        username: 'admin',
        password: 'password123',
        email: 'tuemail@ejemplo.com',
    };

    private otpStore = new Map<string, string>();

    constructor(private jwtService: JwtService) {}

    async login(username: string, password: string) {
        if (username === this.user.username && password === this.user.password) {
        const otp = this.generateOtp();
        this.otpStore.set(username, otp);
        return { message: 'OTP generado', otp };
        }
        throw new UnauthorizedException('Credenciales inválidas');
    }

    async verifyOtp(username: string, otp: string) {
        const storedOtp = this.otpStore.get(username);
        if (storedOtp && storedOtp === otp) {
        this.otpStore.delete(username);
        const payload = { username };
        return {
            access_token: this.jwtService.sign(payload),
        };
        }
        throw new UnauthorizedException('OTP inválido');
    }

    private generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
}
