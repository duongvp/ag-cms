/**
 * career-application controller
 */

// import { factories } from '@strapi/strapi';

// export default factories.createCoreController('api::career-application.career-application');

'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::career-application.career-application', ({ strapi }) => ({
    async create(ctx) {
        try {
            // 1. Nếu là multipart (có file)
            if (ctx.is('multipart')) {
                // Lấy data từ body (là JSON string)
                const { data } = ctx.request.body;
                // Lấy file từ ctx.request.files
                const { resume } = ctx.request.files || {};
                console.log('resume', resume);

                // Parse data
                const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

                // 2. Upload file nếu có
                let uploadedFile = null;
                if (resume) {
                    // 'resume' ở đây là tên field bạn gửi từ FE: 'files.resume'
                    // Strapi tự động gắn vào ctx.request.files.resume
                    const uploadedFiles = await strapi.plugins.upload.services.upload.upload({
                        data: {},
                        files: resume, // có thể là object hoặc array, upload service xử lý được
                    });
                    uploadedFile = uploadedFiles[0];
                }

                // 3. Tạo CareerApplication với ID file
                const entry = await strapi.entityService.create(
                    'api::career-application.career-application',
                    {
                        data: {
                            ...parsedData,
                            resume: uploadedFile ? uploadedFile.id : null,
                        },
                        populate: ['resume'],
                    }
                );

                // 4. Trả về chuẩn Strapi
                return { data: entry, meta: {} };
            }

            // Nếu không phải multipart, xử lý mặc định
            return await super.create(ctx);
        } catch (error) {
            ctx.throw(500, error);
        }
    },
}));