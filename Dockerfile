FROM oven/bun:alpine AS base

ENV DIR=/usr/src/app

WORKDIR $DIR


FROM base AS install

RUN apk update && apk add --no-cache dumb-init
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile


RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --production --frozen-lockfile


FROM base AS prerelease

COPY --from=install /temp/dev/node_modules $DIR/node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build



FROM base AS release

ENV USER=bun

COPY --from=install /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=prerelease $DIR/build/index.js $DIR/


EXPOSE 1337

USER $USER

CMD ["dumb-init", "bun", "run", "index.js"]