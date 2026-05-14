const RSSParser = require('rss-parser');

const parser = new RSSParser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['content:encoded', 'contentEncoded']
    ]
  },
  headers: { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
});

exports.getNews = async (req, res) => {
  try {
    const feed = await parser.parseURL('https://www.espinof.com/index.xml');
    
    const news = feed.items.slice(0, 5).map(item => {
      // En Espinof, la imagen suele venir en media:content o enclosure
      let image = null;
      if (item.enclosure && item.enclosure.url) image = item.enclosure.url;
      if (!image && item.mediaContent) image = item.mediaContent.$.url;
      
      // Si no, buscamos en el contenido HTML
      if (!image) {
        const content = item.contentEncoded || item.content || "";
        const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (imgMatch) image = imgMatch[1];
      }

      // Imagen por defecto si falla todo
      if (!image) image = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop";

      return {
        id: item.guid || item.link,
        title: item.title,
        excerpt: (item.contentSnippet || "").substring(0, 180).replace(/<[^>]*>?/gm, '') + '...',
        image: image,
        source: "Espinof", // Crédito a la fuente
        url: item.link,
        date: item.pubDate ? new Date(item.pubDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) : "Hoy"
      };
    });

    res.status(200).json(news);
  } catch (error) {
    console.error("❌ Error RSS:", error.message);
    res.status(200).json([]); // Fallback al front
  }
};
