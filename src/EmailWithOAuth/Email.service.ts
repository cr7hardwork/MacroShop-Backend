import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  async sendEmail() {
    try {
      const CLIENT_ID = this.configService.get<string>('CLIENT_ID');
      const CLIENT_SECRET = this.configService.get<string>('CLIENT_SECRET');
      const REDIRECT_URI = this.configService.get<string>('REDIRECT_URI');
      const REFRESH_TOKEN = this.configService.get<string>('REFRESH_TOKEN');
      const EMAIL_USER = this.configService.get<string>('EMAIL_USER');

      const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

      const accessToken = await oAuth2Client.getAccessToken();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: EMAIL_USER,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken.token,
        },
      });

      const mailOptions = {
        from: EMAIL_USER,
        to: 'nalbandyanvardges1993@gmail.com',
        subject: 'Test Email with OAuth2',
        text: 'Hello, this is a test email sent with OAuth2!',
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent:', result.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
