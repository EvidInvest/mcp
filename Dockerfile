# EvidInvest MCP server — stdio transport over the published npm package.
# Build:  docker build -t evidinvest-mcp .
# Run:    docker run -i -e EVIDINVEST_API_KEY=evid_sk_... evidinvest-mcp
# Keys:   https://evidinvest.com/developers (free to start, no subscription)
# Hosted alternative (no Docker): https://mcp.evidinvest.com/mcp
FROM node:22-alpine
RUN npm install -g @evidinvest/mcp-server@latest && npm cache clean --force
ENV NODE_ENV=production
ENTRYPOINT ["evidinvest-mcp"]
