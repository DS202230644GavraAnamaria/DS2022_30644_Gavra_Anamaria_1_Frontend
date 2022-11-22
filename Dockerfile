# pull official base image
FROM node:18.12-alpine3.16 as builder

# set working directory
WORKDIR /app

# install app dependencies
COPY . /app/
RUN npm install -f
# add app
COPY ./ /app/
# start app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Start nginx
EXPOSE 82
CMD ["nginx", "-g", "daemon off;"]