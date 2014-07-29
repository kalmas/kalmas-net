kalmas-net
==========

Init

```sh
npm install -g grunt-cli
npm install
bower install
```

Checkout Content

```sh
grunt get-blog
```

Run Dev
-------

Serve

```sh
grunt serve
```

Generate Dev Snapshots

```sh
# while site is running in dev mode
grunt snapshot
```

Run Prod
--------

Build

```sh
grunt build
```

Run

```sh
./start.sh
```

Generate Production Snapshots

```sh
# while site is running in production mode (kalmas.net)
grunt snapshot:dist
```
