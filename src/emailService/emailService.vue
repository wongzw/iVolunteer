<template>
  <a-button
        type="primary"
        size="large"
        class="orange"
        @click="sendMail()"
        >
</template>

<script>
import { google } from "googleapis";
import MailComposer from "nodemailer/lib/mail-composer";
import credentials from "./credentials.json";
import tokens from "./token.json";
import sendMail from "./gmail";

export default {
  name: "emailService",
  data() {
    return {
      to: "",
      subject: "New Volunteer Opportunity Identified 🚀",
      text: "",
    };
  },
  methods: {
    getGmailService() {
      const { client_secret, client_id, redirect_uris } = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
      );
      oAuth2Client.setCredentials(tokens);
      const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
      return gmail;
    },

    async createMail(options) {
      const mailComposer = new MailComposer(options);
      const message = await mailComposer.compile().build();
      return message;
    },

    async sendMail(options) {
      const gmail = this.getGmailService();
      const rawMessage = await this.createMail(options);
      const { data: { id } = {} } = await gmail.users.messages.send({
        userId: "me",
        resource: {
          raw: rawMessage,
        },
      });
      return id;
    },
  },
};
</script>

<style>
.ant-button .orange {
  background-color: #ff5b2e;
  border-color: #ff5b2e;
  border-radius: 5px;
  width: 100%;
  height: auto;
  padding-left: 48px;
  padding-right: 48px;
  white-space: normal;
}
</style>