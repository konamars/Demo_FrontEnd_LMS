FROM node:14-alpine as build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run build

FROM amazon/aws-cli
RUN mkdir /front
WORKDIR /front
COPY --from=build /usr/src/app/build /front
RUN aws s3 cp /front s3://frontend.soumya.website --recursive
EXPOSE 3000

