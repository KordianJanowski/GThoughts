'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const entity = await strapi.services.feedbacks.find( { article_id: ctx.request.header.article_id } );

    let feedbacks = entity.sort((feedback1, feedback2) => +new Date(feedback2.createdAt) - +new Date(feedback1.createdAt))

    feedbacks = entity.slice(0, ctx.request.header.page * 10)

    const data = {
      feedbacks,
      "allFeedbacksNumber": entity.length
    }

    return sanitizeEntity(data, { model: strapi.models.feedbacks });
  },

  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [feedback] = await strapi.services.feedbacks.find({
      id: ctx.params.id,
      'user_id': ctx.state.user.id,
    });

    if (!feedback) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.feedbacks.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.feedbacks.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.feedbacks });
  },
  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [feedback] = await strapi.services.feedbacks.find({
      id: ctx.params.id,
      'user_id': ctx.state.user.id,
    });

    if (!feedback) {
      return ctx.unauthorized(`You can't delete this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.feedbacks.delete({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.feedbacks.delete({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.feedbacks });
  },
};
