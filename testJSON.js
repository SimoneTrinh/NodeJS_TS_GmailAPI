var json = {
  partId: "0",
  mimeType: "multipart/alternative",
  filename: "",
  headers: [
    {
      name: "Content-Type",
      value: 'multipart/alternative; boundary="00000000000032b47f05e5cb5e9b"',
    },
  ],
  body: { size: 0 },
  parts: [
    {
      partId: "0.0",
      mimeType: "text/plain",
      filename: "",
      headers: [Array],
      body: [Object],
    },
    {
      partId: "0.1",
      mimeType: "text/html",
      filename: "",
      headers: [Array],
      body: [Object],
    },
    {
      partId: "0.2",
      mimeType: "text/calendar",
      filename: "invite.ics",
      headers: [Array],
      body: [Object],
    },
  ],
};

console.log(json.parts[0].body);
