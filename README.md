# Build with secret from .env
```bash
fly deploy --build-secret $(grep -v '^#' .env | sed 's/^/=/; s/$/,/' | tr -d '\n' | sed 's/,$//')
```

# Set secret to fly from .env
```bash
fly secrets set $(grep -v '^#' .env | xargs)
```


