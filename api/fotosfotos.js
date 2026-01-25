// api/fotos.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const cloudName = "craneosuy";
  const folder = "evento-qr";

  try {
    // Cloudinary JSON list
    const url = `https://res.cloudinary.com/${cloudName}/image/list/${folder}.json`;
    const response = await fetch(url);
    const data = await response.json();

    // Mapear solo la info que necesitamos
    const fotos = data.resources.map(f => ({
      secure_url: `https://res.cloudinary.com/${cloudName}/image/upload/${f.public_id}.${f.format}`,
      public_id: f.public_id
    }));

    res.status(200).json(fotos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error cargando fotos" });
  }
}
