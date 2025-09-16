# Build stage - Usar Ubuntu en lugar de Alpine
FROM node:24-slim AS builder
WORKDIR /app

# Instalar dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Aumentar límites de memoria para el build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --frozen-lockfile

# Copiar código fuente
COPY . .

# Build de la aplicación
RUN npm run build

# Runtime stage - Mantener Alpine para ser más ligero
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 jnext

# Copiar solo archivos necesarios del build stage
COPY --from=builder --chown=jnext:nodejs /app/.next/standalone ./
COPY --from=builder --chown=jnext:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=jnext:nodejs /app/public ./public

USER jnext

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]