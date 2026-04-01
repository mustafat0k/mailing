## test 

```sh
# Within this mimics App-UI sending a verification email
swaks --to user@gmail.com \
      --from noreply@yourdomain.com \
      --server your-server-ip \
      --port 587 \
      --body "Your verification code is 123456"

# domain creation
curl -X POST http://your-server-ip:8001/v1/domains \
     -H "X-Access-Token: YOUR_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "domain": "yourdomain.com"
     }'
```
## v3 
```yml
  # 5. Custom UI / Verification API
  app-ui:
    build: ./my-custom-ui
    environment:
      - WILDDUCK_API=http://wildduck:8001
      - SMTP_HOST=haraka
    ports:
      - 3000:3000 # Your public dashboard
```