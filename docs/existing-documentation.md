# Existing Documentation Inventory

## Project Documentation Files

| File | Type | Location | Description |
|------|------|----------|-------------|
| `README.md` | Project README | Root | Comprehensive documentation covering installation, usage, configuration, Docker deployment |
| `LICENSE` | License | Root | MIT License |
| `.env.example` | Config Template | Root | Environment variables template |
| `config.yaml.example` | Config Template | Root | YAML configuration example with server, providers, and subagent settings |

## README.md Summary

The README provides comprehensive documentation including:

### Sections Covered:
1. **Overview** - Project purpose and main features
2. **Quick Start** - Prerequisites and installation steps
3. **Local Development** - Clone, configure, install, run
4. **Docker Deployment** - Build, run, docker-compose examples
5. **Claude Code Integration** - Setting ANTHROPIC_BASE_URL
6. **Access Points** - Dashboard, API, health check URLs
7. **Advanced Usage** - Running services separately
8. **Make Commands** - Available build/dev commands
9. **Configuration** - Basic setup and subagent configuration
10. **Environment Variables** - Docker env vars table
11. **Project Structure** - Directory overview
12. **Features in Detail** - Request monitoring, web dashboard

### Key Information Extracted:
- **Ports:** Proxy (3001), Web Dashboard (5173)
- **Database:** SQLite (requests.db)
- **Prerequisites:** Go 1.20+, Node.js 18+ (or Docker)
- **Entry Command:** `make dev` or `./run.sh`

## User-Provided Context

No additional documentation or focus areas specified.
