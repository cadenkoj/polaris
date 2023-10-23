FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS deps
RUN pnpm install --prod --frozen-lockfile
RUN pnpm install --frozen-lockfile

CMD [ "pnpm", "start" ]
