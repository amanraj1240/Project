const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // ===============================
  // API Developed by @Shuubbhhhaaammm
  // ===============================

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { num } = req.query;

  if (!num) {
    return res.status(400).json({
      error: "Phone number is required",
      usage: "https://your-app.vercel.app/?num=9876543210",
      credit: "@Shuubbhhhaaammm"
    });
  }

  try {
    const cleanNum = num.toString().replace(/\D/g, '');

    const apiUrl = `https://ravan-lookup.vercel.app/api?key=Ravan&type=mobile&term=${cleanNum}`;

    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      timeout: 10000
    });

    const responseText = await response.text();

    let jsonData;
    try {
      jsonData = JSON.parse(responseText);
    } catch {
      jsonData = { raw: responseText };
    }

    // 🔥 REMOVE EXISTING CREDIT (like @The_Learnerboy)
    delete jsonData.credit;
    delete jsonData.owner;
    delete jsonData.developer;

    return res.status(200).json({
      ...jsonData,
      credit: "@Shuubbhhhaaammm",
      developer: "Shuubbhhhaaammm"
    });

  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Failed to fetch data",
      note: "If any error occurs, DM @Shuubbhhhaaammm",
      developer: "@Shuubbhhhaaammm"
    });
  }
};
