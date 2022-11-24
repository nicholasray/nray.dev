/* eslint-disable @typescript-eslint/no-var-requires */
const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = withContentlayer({
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
  reactStrictMode: false,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push(
      ...[
        {
          test: /\.svg$/,
          issuer: /\.[jt]sx?$/,
          use: ["@svgr/webpack"],
        },
      ]
    );

    return config;
  },
});

module.exports = nextConfig;
