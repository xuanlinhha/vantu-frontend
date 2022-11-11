ROOTDIR := $(shell pwd)
OUTPUT_DIR ?= $(ROOTDIR)/_output
DOCKER_HUB_ID=xuanlinhha

FRONTEND_IMAGE := gatsby-vantu-frontend
.PHONY: vantu-frontend
vantu-frontend:
	rm -rf $(OUTPUT_DIR) && mkdir -p $(OUTPUT_DIR) && \
	yarn install && yarn build && \
	mv public $(OUTPUT_DIR) && cp Dockerfile $(OUTPUT_DIR) && \
	docker build $(OUTPUT_DIR) -t $(FRONTEND_IMAGE) -f $(OUTPUT_DIR)/Dockerfile --no-cache=true && \
	docker tag $(FRONTEND_IMAGE) $(DOCKER_HUB_ID)/$(FRONTEND_IMAGE)
