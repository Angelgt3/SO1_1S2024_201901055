FROM golang:alpine as build

WORKDIR /backend

COPY . .

RUN go build -o main .

EXPOSE 3000

CMD ["./main"]
