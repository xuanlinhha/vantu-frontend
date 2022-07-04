### Development
```sh
yarn install && yarn build
sudo rm -rf /var/www/html/* && sudo cp -r ./public/* /var/www/html
```

### 
```sh
docker build -t gatsby-vantu-frontend --no-cache=true .
docker tag gatsby-vantu-frontend xuanlinhha/gatsby-vantu-frontend
docker push xuanlinhha/gatsby-vantu-frontend

docker run -d -p 8080:80 --name gatsby-vantu-frontend xuanlinhha/gatsby-vantu-frontend
```
