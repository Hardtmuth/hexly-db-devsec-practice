run-server:
	node ./backend/server

run-dev:
	cd ./frontend && npx vite

run-db:
	cd ./backend && docker compose -f docker-compose.yml --env-file .env up -d

lint:
	npx eslint


