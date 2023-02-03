const form = document.getElementById("search");
const input = document.getElementById("url");

const searchQueryUrl = "https://www.google.com/search?q=";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await window.navigator.serviceWorker.register("/uv/sw.js", {
    scope: __uv$config.prefix,
  });

  const query = input.value.trim();
  let url = query;

  if (!isValidUrl(query)) url = searchQueryUrl + query;
  else if (!(query.startsWith("http://") || query.startsWith("https://"))) {
    protocolQuery = "http://" + query;
    if (isValidUrl(protocolQuery)) url = protocolQuery;
  }

  window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});

function isValidUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
