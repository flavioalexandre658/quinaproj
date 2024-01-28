const { defineConfig } = require("@vue/cli-service");
const axios = require("axios");
const { SitemapStream, streamToPromise } = require("sitemap");
const CompressionPlugin = require("compression-webpack-plugin")


let compression;

  const compressionTest = /\.(js|css|html|ico)(\?.*)?$/i
  compression = new CompressionPlugin({
    algorithm: "gzip",
    compressionOptions: {
      numiterations: 15
    },
    minRatio: 0.99,
    test: compressionTest
  })


async function fetchCampaigns() {
  try {
    const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/campaigns?limit=1000000`);
    return response.data.data; // Suponha que a resposta contém os dados das campanhas.
  } catch (error) {
    console.error("Erro ao buscar campanhas:", error);
    return [];
  }
}

function mapCampaignsToPaths(campaigns) {
  const paths = [];

  campaigns.forEach((campaign) => {
    if (campaign.closed === 0) {
      paths.push({
        url: `/acao/${campaign.slug}`,
        changefreq: "monthly",
        priority: 0.8,
      });
    } else if (campaign.closed === 1) {
      paths.push({
        url: `/acao/encerrada/${campaign.slug}`,
        changefreq: "monthly",
        priority: 0.8,
      });
    }
  });

  return paths;
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  chainWebpack: (config) => {
    config.performance.maxEntrypointSize(4000000).maxAssetSize(4000000);
  },
  configureWebpack: {
    plugins: [
      compression,
      {
        apply: (compiler) => {
          compiler.hooks.emit.tapAsync("GenerateSitemap", async (compilation, callback) => {
            try {
              const campaigns = await fetchCampaigns();

              // Adicione manualmente as rotas / e /register
              const paths = [
                {
                  url: "/",
                  changefreq: "monthly",
                  priority: 1.0,
                },
                {
                  url: "/register",
                  changefreq: "monthly",
                  priority: 0.9,
                },
                ...mapCampaignsToPaths(campaigns),
              ];

              const sitemapStream = new SitemapStream({
                hostname: "https://app.123rifas.com",
              });

              paths.forEach((path) => {
                sitemapStream.write(path);
              });

              sitemapStream.end();

              const sitemapXML = await streamToPromise(sitemapStream);

              compilation.assets["sitemap.xml"] = {
                source: () => sitemapXML.toString(),
                size: () => sitemapXML.length,
              };

              callback();
            } catch (error) {
              console.error("Erro ao gerar sitemap dinâmico:", error);
              callback(error);
            }
          });
        },
      },
    ],
  },
});
