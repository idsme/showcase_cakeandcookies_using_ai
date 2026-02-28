FROM nginx:alpine
COPY . /usr/share/nginx/html/
RUN rm /usr/share/nginx/html/Dockerfile \
    /usr/share/nginx/html/PRD_Taart_en_Koek.txt \
    /usr/share/nginx/html/README.MD
RUN rm -rf /usr/share/nginx/html/k8s /usr/share/nginx/html/.git /usr/share/nginx/html/.gitignore
EXPOSE 80
