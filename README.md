# ButtonGame

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Installation guide

NOTE: Most of these commands need `root` access or `sudo`.

Download:
```bash
git clone https://github.com/Natsku123/Button-Game.git
```

### Build

Install dependencies:
```bash
cd button-game
npm install
```

If everything went well with dependencies:
```bash
ng build --prod
```
This command outputs to `dist/` inside `button-game/`

Copy built app from dist to your desired destination:
```bash
cp -r dist/ButtonGame /var/www/ButtonGame
```

### Setup nginx

Create nginx configuration:
```bash
nano /etc/nginx/sites-available/button-game.conf
```

And paste this with your own values:
```bash
server {
  listen 80;
  server_name www.example-game.com example-game.com; # Replace this
  root /var/www/ButtonGame; # Replace this if different
  
  location / {
    try_files $uri $uri/ /index.html =404;
  }
}
```

Enable your configuration:
```bash
ln -s /etc/nginx/sites-available/button-game.conf /etc/nginx/sites-enabled/button-game.conf
```

Test that your configuration works:
```bash
nginx -t
```

Reload nginx:
```bash
service nginx reload
```

Now make sure your domain points to your server's/computer's IP-address.

#### Setup SSL (optional)

Download certbot (if you are using something other than Ubuntu 14.04 - 18.04, installation guide can be found [here](https://certbot.eff.org/)):
```bash
apt-get update
apt-get install software-properties-common
add-apt-repository universe
add-apt-repository ppa:certbot/certbot
apt-get update
apt-get install certbot python-certbot-nginx 
```

Get SSL certificates from Let's Encrypt:
```bash
certbot --nginx
```
Now select your newly created site.


### Finish

Now you can visit your domain in your browser and should see the game working.
