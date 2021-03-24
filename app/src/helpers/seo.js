export function seo(data = {}) {
  if (data.title) {
    document.title = data.title + " | Ausync"
  }
  data.description = data.description || 'Create NFT programmable music';
  document.querySelector('meta[name="description"]').setAttribute('content', data.description);
}