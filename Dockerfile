FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force
    
COPY . .

RUN npm run build

FROM node:22-alpine AS production

RUN addgroup -g 1001 -S nodejs && adduser -S nuxtjs -u 1001
    
WORKDIR /app

COPY --from=builder --chown=nuxtjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nuxtjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output

RUN apk add --no-cache dumb-init && rm -rf /var/cache/apk/*

USER nuxtjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", ".output/index.js"]