IMAGE_NAME=zfeng/zf.ink
IMAGE_VERSION=0.0.1


build:
	yarn
	npm run build
image:
	yarn
	npm run build
	yarn install --production
	docker build -t $(IMAGE_NAME):$(IMAGE_VERSION) .
