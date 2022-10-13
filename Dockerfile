FROM node as build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm install -g @angular/cli
RUN ng build
RUN npm run build
FROM amazon/aws-cli
RUN mkdir /front
WORKDIR /front
COPY --from=build /usr/src/app/build /front
RUN aws s3 cp /front s3://my-s3bucket-20221012115702135600000001 --recursive
EXPOSE 3000
