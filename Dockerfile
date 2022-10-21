FROM node as build
RUN mkdir /captain
WORKDIR /captain
COPY . /captain
RUN npm install -g @angular/cli
CMD ["ng", "build"]
FROM amazon/aws-cli
RUN mkdir /front
WORKDIR /front
COPY --from=build //captain /front
RUN aws s3 cp /front s3://my-s3bucket-20221012115702135600000001 --recursive
EXPOSE 3000
