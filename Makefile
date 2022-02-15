# 🜏 ~ John Murowaniecki Sant`Anna

EXECUTOR ?= yarn

### COMMON COMMANDS

help: ## Show this help.
	@echo "$$(fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep \
	| sed -E 's/\\$$//;s/[#]{3} (.*$$)/\n\n\1\:\n/;s/(.*):.*#''# (.*)/\1:\2/g' \
	| awk -F':' '{printf(($$1""$$2 != "" ? "%-20s\1%s\n" :"\n"), $$1, $$2); }' )"

: ## \

install: ## Install Node packages using Yarn or NPM…
	$(EXECUTOR) install

start: node_modules ## Run application - start rover.
	$(EXECUTOR) start

message: node_modules ## Run messenger - command rover.
	$(EXECUTOR) run message

lint: node_modules ## Run ESLint.
	$(EXECUTOR) run eslint ./{src,lib}/*

tests: node_modules ## Run ESLint.
	$(EXECUTOR) test

clear: ## Remove node packages, lock files and temporary data…
	rm -Rf node_modules package-lock.json yarn.lock
