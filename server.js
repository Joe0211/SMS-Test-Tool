const fs = require("fs");
const http = require("http");
const path = require("path");

const HOST = "127.0.0.1";
const PORT = 5177;
const ROOT_DIR = __dirname;
const OUTPUT_DIR = path.join(ROOT_DIR, "outputs");
const ANALYSIS_URL = "http://47.237.180.133:8887/migration/service/command?service=1.56";
const MESSAGE_TYPE_USER_IDS = {
  MK: "e87c57670c",
  BC: "45165f4b38",
};

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

function safeFilename(filename) {
  return path.basename(filename).replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-") || "sms.png";
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100 * 1024 * 1024) {
        request.destroy();
        reject(new Error("Request body is too large"));
      }
    });

    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

async function saveImages(request, response) {
  try {
    const payload = JSON.parse(await readRequestBody(request));
    const images = Array.isArray(payload.images) ? payload.images : [];

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const saved = images.map((image) => {
      const match = String(image.dataUrl || "").match(/^data:image\/png;base64,(.+)$/);
      if (!match) {
        throw new Error("Only PNG data URLs are supported");
      }

      const filename = safeFilename(String(image.filename || "sms.png"));
      const outputPath = path.join(OUTPUT_DIR, filename);
      fs.writeFileSync(outputPath, Buffer.from(match[1], "base64"));
      return filename;
    });

    sendJson(response, 200, {
      saved,
      outputDir: OUTPUT_DIR,
    });
  } catch (error) {
    sendJson(response, 400, { error: error.message });
  }
}

async function analyzeContent(request, response) {
  try {
    const payload = JSON.parse(await readRequestBody(request));
    const content = String(payload.content || "");
    const messageType = String(payload.messageType || "BC").toUpperCase();
    const userId = MESSAGE_TYPE_USER_IDS[messageType] || MESSAGE_TYPE_USER_IDS.BC;

    if (!content.trim()) {
      throw new Error("Content is required");
    }

    const analysisResponse = await fetch(ANALYSIS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        command: "content_analysis",
        parameter: {
          operator: "Telkomsel",
          content,
          user_id: userId,
        },
      }),
    });

    const analysisText = await analysisResponse.text();
    let analysisResult;

    try {
      analysisResult = JSON.parse(analysisText);
    } catch (_error) {
      throw new Error("Content analysis returned invalid JSON");
    }

    if (!analysisResponse.ok || !analysisResult.success) {
      throw new Error(analysisResult.message || `Content analysis failed: ${analysisResponse.status}`);
    }

    sendJson(response, 200, analysisResult);
  } catch (error) {
    sendJson(response, 400, { success: false, message: error.message });
  }
}

function serveStatic(request, response) {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);
  const requestedPath = requestUrl.pathname === "/" ? "/index.html" : decodeURIComponent(requestUrl.pathname);
  const filePath = path.normalize(path.join(ROOT_DIR, requestedPath));

  if (!filePath.startsWith(ROOT_DIR)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": MIME_TYPES[path.extname(filePath)] || "application/octet-stream",
    });
    response.end(content);
  });
}

const server = http.createServer((request, response) => {
  if (request.method === "POST" && request.url === "/save-images") {
    saveImages(request, response);
    return;
  }

  if (request.method === "POST" && request.url === "/analyze-content") {
    analyzeContent(request, response);
    return;
  }

  if (request.method === "GET") {
    serveStatic(request, response);
    return;
  }

  response.writeHead(405);
  response.end("Method not allowed");
});

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

server.listen(PORT, HOST, () => {
  console.log(`SMS screenshot tool: http://${HOST}:${PORT}`);
  console.log(`PNG output folder: ${OUTPUT_DIR}`);
});
