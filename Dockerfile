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
WORKDIR /app
COPY ./ /app
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
EXPOSE 3333
ENV NODE_ENV=production
ENV TZ=UTC
ENV PORT=3333
ENV HOST=0.0.0.0
ENV LOG_LEVEL=info
ENV APP_KEY=Xi57h6ZJwM7NN51Tzmg0OqCU_lUvaSu4
ENV SESSION_DRIVER=cookie
ENV GITHUB_CLIENT_ID=Iv23li6mhUjoY54VrNum
ENV GITHUB_CLIENT_SECRET=511abfadc987867f2a1c18808684cc61b2d318ce
ENV DB_MODE=local
ENV DB_URL='wss://thebasedoc-staging-patricknewyen.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTkxNDg4MzEsImlkIjoiY2IzNWI2YzgtNDgyMC00M2JhLTg4MTItYTE0NTM1NGIwYTRkIn0.LLlmzd86ZV7pGsT6f3f9oqRKaoPOLHH9exrFAUwQYX5Tp0ZsF54QoBd2HLDSKVGv3_vpP_9bPumiQK8MbxPABw'
RUN node ace migration:run --force
CMD ["node", "./build/bin/server.js"]