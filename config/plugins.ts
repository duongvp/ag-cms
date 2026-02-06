module.exports = ({ env }) => ({
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: env('EMAIL_SMTP_HOST', 'smtp.gmail.com'),
                port: env('EMAIL_SMTP_PORT', 587),
                auth: {
                    user: env('EMAIL_SMTP_USER'),
                    pass: env('EMAIL_SMTP_PASS'),
                },
            },
            settings: {
                defaultFrom: 'no-reply@asiagroup.com',
                defaultReplyTo: 'contact@asiagroup.com',
            },
        },
    },
});