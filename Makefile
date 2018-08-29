.PHONY: build

build: index.user.js
index.user.js: index.user.ts
	tsc --target es2015 $<
