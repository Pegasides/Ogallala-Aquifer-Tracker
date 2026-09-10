# Ogallala Subscriber PortalCloudflare Worker for the Ogallala Aquifer Tracker subscription checkout.## Cloudflare configuration- Root directory: `subscriber-portal`- Deploy command: `npx wrangler deploy`- Required encrypted secret: `STRIPE_SECRET_KEY`- The Stripe price ID is a non-secret Worker variable in `wrangler.toml`.Managed Payments and automatic tax are explicitly disabled for the currentsandbox checkout. Tax treatment must be reviewed before live payments begin.Never commit Stripe secret keys to GitHub.

Deployment connection verified September 10, 2026.
# Ogallala Subscriber Portal

Cloudflare Worker for the Ogallala Aquifer Tracker subscription checkout.

## Cloudflare configuration

- Root directory: `subscriber-portal`
- Deploy command: `npx wrangler deploy`
- Required encrypted secret: `STRIPE_SECRET_KEY`
- The Stripe price ID is a non-secret Worker variable in `wrangler.toml`.

Managed Payments and automatic tax are explicitly disabled for the current
sandbox checkout. Tax treatment must be reviewed before live payments begin.

Never commit Stripe secret keys to GitHub.
