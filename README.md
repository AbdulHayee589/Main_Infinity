## Laravel + InertiaJS + ReactJS + TailwindCSS + Vite SPA

### Requirments:
| Name| Version |
| ------ | ------ |
| PHP | 8.1^ |
| Docker | x |
| Composer | x |
| NodeJS | v17^ |

### How to setup:
```bash
composer install
./vendor/bin/sail install
./vendor/bin/sail up
./vendor/bin/sail php artisan migrate:fresh
./vendor/bin/sail php artisan db:seed
./vendor/bin/sail php artisan app:fresh-blueprints
```

```bash
yarn install
yarn run dev
```

