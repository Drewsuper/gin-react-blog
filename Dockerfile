FROM ubuntu:latest
RUN apt-get update
RUN apt-get install vim unzip -y
RUN apt-get install ca-certificates -y
RUN cd /usr/local
ADD go1.20.1.linux-amd64.tar.gz /usr/local
ADD api.zip /api/
RUN cd /api && unzip api.zip && chmod +x start.sh
RUN rm -rf /api/api.zip
ENV GOROOT=/usr/local/go
ENV PATH=$PATH:$GOROOT/bin
ENV GOPATH=/go_data
ENV GO111MODULE=on
ENV GOPROXY=https://goproxy.cn
WORKDIR /api
CMD ["sh","-c","/api/start.sh"]
