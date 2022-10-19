FROM node:16.18.0-alpine3.16 as build
RUN mkdir /captain
WORKDIR /captain
COPY . /captain
RUN npm install -g @angular/cli
RUN ng build --prod
FROM amazon/aws-cli
RUN mkdir /front
WORKDIR /front
COPY --from=build /captain/public /front
RUN aws s3 cp /front s3://frontend.soumya.website --recursive
#EXPOSE 3000

