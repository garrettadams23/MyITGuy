exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ok: true, service: "myitguy", ts: Date.now(), message: "Health check passed" }),
  };
};
