dev:
	make -j 2 dev-server dev-client

dev-server:
	cd backend && yarn dev

dev-client:
	cd frontend && yarn start

