FROM node:20.12.2-alpine3.18 as nodebase


# All deps stage
FROM nodebase as deps
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn install

# Build stage
FROM nodebase as build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build 


# Production stage
FROM nodebase as production
# Define build arguments
ARG TZ
ARG PORT
ARG HOST
ARG LOG_LEVEL
ARG APP_KEY
ARG NODE_ENV
ARG SESSION_DRIVER
ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET
ARG GITHUB_CALLBACK_URL
ARG DB_MODE
ARG DB_URL

# Use build arguments as environment variables
ENV TZ=$TZ
ENV PORT=$PORT
ENV HOST=$HOST
ENV LOG_LEVEL=$LOG_LEVEL
ENV APP_KEY=$APP_KEY
ENV NODE_ENV=$NODE_ENV
ENV SESSION_DRIVER=$SESSION_DRIVER
ENV GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID
ENV GITHUB_CALLBACK_URL=$GITHUB_CALLBACK_URL
ENV DB_MODE=$DB_MODE
ENV DB_URL=$DB_URL
WORKDIR /app
COPY ./ /app
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
EXPOSE 3333
RUN --mount=type=secret,id=APP_KEY \
    --mount=type=secret,id=GITHUB_CLIENT_ID \
    --mount=type=secret,id=GITHUB_CLIENT_SECRET \
    --mount=type=secret,id=DB_URL \
    APP_KEY="$(cat /run/secrets/APP_KEY)" \
    GITHUB_CLIENT_ID="$(cat /run/secrets/GITHUB_CLIENT_ID)" \
    GITHUB_CLIENT_SECRET="$(cat /run/secrets/GITHUB_CLIENT_SECRET)" \
    DB_URL="$(cat /run/secrets/DB_URL)" \
    node ace migration:run --force
CMD ["node", "./build/bin/server.js"]
