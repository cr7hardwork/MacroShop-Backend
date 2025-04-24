import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

@Injectable()
export class EmailService {
  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;
  private readonly REDIRECT_URI: string;
  private readonly REFRESH_TOKEN: string;
  private readonly EMAIL_USER: string;

  constructor(private configService: ConfigService) {
    this.CLIENT_ID = this.configService.get<string>('CLIENT_ID');
    this.CLIENT_SECRET = this.configService.get<string>('CLIENT_SECRET');
    this.REDIRECT_URI = this.configService.get<string>('REDIRECT_URI');
    this.REFRESH_TOKEN = this.configService.get<string>('REFRESH_TOKEN');
    this.EMAIL_USER = this.configService.get<string>('EMAIL_USER');
  }

  private async getAccessToken() {
    try {
      const oAuth2Client = new google.auth.OAuth2(
        this.CLIENT_ID,
        this.CLIENT_SECRET,
        this.REDIRECT_URI,
      );

      oAuth2Client.setCredentials({ refresh_token: this.REFRESH_TOKEN });

      const accessToken = await oAuth2Client.getAccessToken();
      if (!accessToken.token) {
        throw new Error('Access token not received');
      }

      return accessToken.token;
    } catch (error) {
      console.error('Error obtaining access token:', error);
      throw new Error('Failed to get access token');
    }
  }

  private async createTransporter() {
    try {
      const accessToken = await this.getAccessToken();  

      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: this.EMAIL_USER,
          clientId: this.CLIENT_ID,
          clientSecret: this.CLIENT_SECRET,
          refreshToken: this.REFRESH_TOKEN,
          accessToken: accessToken,  
        },
      });
    } catch (error) {
      console.error('Error creating transporter:', error);
      throw new Error('Failed to create email transporter');
    }
  }

  private async sendMail(transporter: any) {
    try {
      const mailOptions = {
        from: this.EMAIL_USER,
        to: '741230real@gmail.com',
        subject: 'macro email',
        text: 'Your macro is ready',
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent:', result.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendEmail() {
    try {
      const transporter = await this.createTransporter();
      await this.sendMail(transporter);
    } catch (error) {
      console.error('Error in sendEmail process:', error);
    }
  }
}
