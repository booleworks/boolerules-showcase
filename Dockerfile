FROM node:21-alpine
RUN mkdir /opt/boolerules-showcase
COPY .output /opt/boolerules-showcase
CMD node /opt/boolerules-showcase/server/index.mjs
EXPOSE 3000
