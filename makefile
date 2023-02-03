dev:
	make -j 2 dev-server dev-client

dev-server:
	cd backend && yarn dev

dev-client:
	cd frontend && yarn start

prod:
	make -j 2 prod-client prod-server 

prod-server:
	cd backend && yarn start

prod-client:
	cd frontend 
	touch env.json && echo '{"API_URL": "http://51.15.205.148:5000/"}' > env.json
	yarn build

install:
	make -j 3 install-root install-client install-server

install-root:
	yarn install

install-client:
	cd frontend && yarn install

install-server:
	cd backend && yarn install
