let childProcess;
let fs;
let http;
let path;

const HOST = "127.0.0.1";
const START_PORT = 5174;
const END_PORT = 5190;
let ROOT;
let DIST_DIR;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".wasm": "application/wasm",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function loadNodeModules() {
  [childProcess, fs, http, path] = await Promise.all([
    import("node:child_process"),
    import("node:fs"),
    import("node:http"),
    import("node:path"),
  ]);

  ROOT = path.dirname(path.resolve(process.argv[1] || "."));
  DIST_DIR = path.join(ROOT, "dist");
}

function failStartup(message) {
  console.error("");
  console.error(message);
  console.error("");
  console.error("Verifique se esta pasta contem:");
  console.error("  Iniciar.bat");
  console.error("  server.js");
  console.error("  dist/index.html");
  console.error("  dist/operador.html");
  process.exit(1);
}

function ensureBuildExists() {
  if (!fs.existsSync(DIST_DIR)) {
    failStartup("A pasta dist nao foi encontrada. Compile o projeto e copie o dist para esta pasta.");
  }

  if (!fs.existsSync(path.join(DIST_DIR, "index.html"))) {
    failStartup("O arquivo dist/index.html nao foi encontrado.");
  }

  if (!fs.existsSync(path.join(DIST_DIR, "operador.html"))) {
    failStartup("O arquivo dist/operador.html nao foi encontrado.");
  }
}

function getSafeFilePath(requestUrl) {
  let urlPath;

  try {
    urlPath = new URL(requestUrl, `http://${HOST}`).pathname;
    urlPath = decodeURIComponent(urlPath);
  } catch {
    return null;
  }

  if (urlPath === "/" || urlPath === "") {
    urlPath = "/index.html";
  } else if (urlPath === "/operador" || urlPath === "/operador.html") {
    urlPath = "/operador.html";
  }

  const normalizedPath = path.normalize(urlPath).replace(/^([/\\])+/, "");
  const filePath = path.join(DIST_DIR, normalizedPath);
  const relativePath = path.relative(DIST_DIR, filePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    return null;
  }

  return filePath;
}

function sendFile(request, response, filePath) {
  fs.stat(filePath, (statError, stat) => {
    if (statError || !stat.isFile()) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Arquivo nao encontrado.");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extension] || "application/octet-stream";
    const isAsset = filePath.includes(`${path.sep}assets${path.sep}`);

    response.writeHead(200, {
      "Cache-Control": isAsset ? "public, max-age=31536000, immutable" : "no-cache",
      "Content-Length": stat.size,
      "Content-Type": contentType,
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    const stream = fs.createReadStream(filePath);

    stream.on("error", () => {
      if (!response.headersSent) {
        response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      }
      response.end("Erro ao ler o arquivo.");
    });

    stream.pipe(response);
  });
}

function handleRequest(request, response) {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, {
      "Allow": "GET, HEAD",
      "Content-Type": "text/plain; charset=utf-8",
    });
    response.end("Metodo nao permitido.");
    return;
  }

  const filePath = getSafeFilePath(request.url);

  if (!filePath) {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Caminho invalido.");
    return;
  }

  sendFile(request, response, filePath);
}

function listenOnPort(port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(handleRequest);

    server.once("error", (error) => {
      server.close();

      if (error.code === "EADDRINUSE") {
        resolve(null);
        return;
      }

      reject(error);
    });

    server.listen(port, HOST, () => {
      resolve({ server, port });
    });
  });
}

async function listenOnAvailablePort() {
  for (let port = START_PORT; port <= END_PORT; port += 1) {
    const result = await listenOnPort(port);
    if (result) return result;
  }

  throw new Error(`Nenhuma porta livre entre ${START_PORT} e ${END_PORT}.`);
}

function openUrl(url) {
  if (process.env.CHOQUE_NO_OPEN === "1") return;

  try {
    if (process.platform === "win32") {
      childProcess.spawn("cmd", ["/c", "start", "", url], {
        detached: true,
        stdio: "ignore",
      }).unref();
      return;
    }

    if (process.platform === "darwin") {
      childProcess.spawn("open", [url], { detached: true, stdio: "ignore" }).unref();
      return;
    }

    childProcess.spawn("xdg-open", [url], { detached: true, stdio: "ignore" }).unref();
  } catch {
    console.log("Abra o endereco manualmente no navegador.");
  }
}

async function main() {
  await loadNodeModules();
  ensureBuildExists();

  const { server, port } = await listenOnAvailablePort();
  const gameUrl = `http://${HOST}:${port}/`;
  const operatorUrl = `http://${HOST}:${port}/operador.html`;

  console.clear();
  console.log("Choque Economico");
  console.log("");
  console.log("Servidor local iniciado. Mantenha esta janela aberta enquanto estiver usando o jogo.");
  console.log("");
  console.log(`  Jogo:   ${gameUrl}`);
  console.log(`  Operador: ${operatorUrl}`);
  console.log("");
  console.log("Pressione Ctrl+C para encerrar.");

  openUrl(gameUrl);
  openUrl(operatorUrl);

  process.on("SIGINT", () => {
    server.close(() => process.exit(0));
  });

  process.on("SIGTERM", () => {
    server.close(() => process.exit(0));
  });
}

main().catch((error) => {
  console.error("");
  console.error(error.message);
  console.error("");
  process.exit(1);
});
