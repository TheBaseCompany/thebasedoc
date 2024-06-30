# Use Oven's Bun image as the base
FROM oven/bun:latest as base

# All deps stage
FROM base as deps
WORKDIR /app
ADD bun.lockb package.json ./
RUN bun install

# Production only deps stage
FROM base as production-deps
WORKDIR /app
ADD bun.lockb package.json ./
RUN bun install --production

# Build stage using Yarn
FROM node:20.12.2-alpine3.18 as build
WORKDIR /app
RUN apk add --no-cache curl bash yarn
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN yarn global add @adonisjs/cli
# Update the build command to specify an output directory
RUN yarn node ace build

# Production stage using Oven's Bun distroless image
FROM oven/bun:distroless as production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE 8080
CMD ["bun", "run", "./bin/server.js"]
